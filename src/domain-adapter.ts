"use strict";

import {URL} from "url";
import {parseDomain, ParseResultListed} from "parse-domain";

export default class DomainAdapter {
    private _domain: string = '';
    private _subdomain: string = '';
    private _path: string = '';
    private inputDomain: string = '';

    constructor(protected domainOrUrl: string = '') {
        this.stripWWW();
        this.assureUrl();
        this.punyCode();
        this.generateDomainSubdomain();
        this.generatePath();
    }

    private generateDomainSubdomain() {
        let parsedDomain = '';
        let parsedSubdomain = '';

        // Parse domain
        // typecast to overcome a stupid definition
        const parseResult = <ParseResultListed>parseDomain(this.inputDomain);
        if (parseResult && parseResult.icann) {
            const {subDomains, domain, topLevelDomains} = parseResult.icann;

            if (domain && topLevelDomains.length) {
                parsedDomain = domain + '.' + topLevelDomains.join('.');
            }
            if (subDomains.length) {
                parsedSubdomain = subDomains.join('.');
            }
        }

        this._domain = parsedDomain;
        this._subdomain = parsedSubdomain;
    }

    private stripWWW() {
        if (this.domainOrUrl.includes('gov.') || this.domainOrUrl.includes('gob.') || this.domainOrUrl.includes('nhs.')) {
            this.domainOrUrl = this.domainOrUrl.replace(/^(?:https?:\/\/)?/i, '');
        } else {
            this.domainOrUrl = this.domainOrUrl.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');
        }
    }

    private assureUrl() {
        this.domainOrUrl = this.domainOrUrl.replace('http://', '');
        this.domainOrUrl = this.domainOrUrl.replace('https://', '');
        this.domainOrUrl = this.domainOrUrl.replace('ftp://', '');

        this.domainOrUrl = 'https://' + this.domainOrUrl;
    }

    private punyCode() {
        try {
            if (this.domainOrUrl.length > 'https://'.length) {
                // this will transform punnycode
                let transformed = new URL(this.domainOrUrl);
                this.inputDomain = transformed.hostname;
            }
        } catch {
            this.inputDomain = '';
        }
    }

    private generatePath() {
        try {
            let url = new URL(this.domainOrUrl);
            this._path = url.pathname
        } catch {
            this._path = '/';
        }

    }

    public get path(): string {
        return this._path;
    }

    public get domain(): string {
        return this._domain;
    }

    public get subdomain(): string {
        return this._subdomain;
    }

    public get hostname(): string {
        return [this.subdomain, this.domain].filter(v => v).join('.');
    }

    public get commondomain(): string {
        let pathParts = this.path.split('/');
        let common = this.hostname + '/' + pathParts[1];
        return common.endsWith('/') ? common.slice(0, -1) : common;
    }

    public get valid(): boolean {
        return !!this.hostname;
    }

    public static valid(urlOrDomain: string = '') {
        let instance = new DomainAdapter(urlOrDomain);

        return instance.valid;
    }
}

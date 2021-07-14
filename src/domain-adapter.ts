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
        this.domainOrUrl = this.domainOrUrl.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');
    }

    private assureUrl() {
        this.domainOrUrl = this.domainOrUrl.replace('http://', '');
        this.domainOrUrl = this.domainOrUrl.replace('https://', '');
        this.domainOrUrl = 'https://' + this.domainOrUrl;
    }

    private punyCode() {
        if (this.domainOrUrl.length > 'https://'.length) {
            // this will transform punnycode
            let transformed = new URL(this.domainOrUrl);
            this.inputDomain = transformed.hostname;
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

    public get valid(): boolean {
        return !!this.hostname;
    }

    public static valid(urlOrDomain: string = '') {
        let instance = new DomainAdapter(urlOrDomain);

        return instance.valid;
    }
}

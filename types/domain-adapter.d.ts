export default class DomainAdapter {
    protected domainOrUrl: string;
    private _domain;
    private _subdomain;
    private _path;
    private inputDomain;
    constructor(domainOrUrl?: string);
    parse(domainOrUrl?: string): this;
    private generateDomainSubdomain;
    private stripWWW;
    private assureUrl;
    private punyCode;
    private generatePath;
    get path(): string;
    get domain(): string;
    get subdomain(): string;
    get hostname(): string;
    get commondomain(): string;
    get valid(): boolean;
    static valid(urlOrDomain?: string): boolean;
}

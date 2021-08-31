"use strict";

import {expect} from "chai";
import DomainAdapter from "../src/domain-adapter";

describe('DomainAdapter (domain-adapter.spec.ts)', () => {

    describe('domain', () => {

        it('should return empty string for empty string', () => {
            let test = new DomainAdapter('');

            expect(test.domain).to.equal('');

        });

        it('should return empty string for no param', () => {
            let test = new DomainAdapter();

            expect(test.domain).to.equal('');

        });

        it('should return empty string for .com', () => {
            let test = new DomainAdapter('.com');

            expect(test.domain).to.equal('');

        });

        it('should return empty string for space before domain', () => {
            let test = new DomainAdapter(' example.com');

            expect(test.domain).to.equal('');

        });

        it('should return empty string for space between protocol and domain', () => {
            let test = new DomainAdapter('http:// example.com');

            expect(test.domain).to.equal('');

        });


        it('should return example.com for example.com', () => {
            let test = new DomainAdapter('example.com');

            expect(test.domain).to.equal('example.com');

        });

        it('should return example.com for ftp://example.com', () => {
            let test = new DomainAdapter('ftp://example.com');

            expect(test.domain).to.equal('example.com');

        });

        it('should return example.co.uk for example.co.uk', () => {
            let test = new DomainAdapter('example.co.uk');

            expect(test.domain).to.equal('example.co.uk');

        });

        it('should not return empty for www.gov.uk', () => {
            let test = new DomainAdapter('www.gov.uk');

            expect(test.domain).to.not.equal('');
        });

        it('should not return empty for www.nhs.uk', () => {
            let test = new DomainAdapter('www.nhs.uk');

            expect(test.domain).to.not.equal('');
        });

        it('should not return empty for www.gob.cl', () => {
            let test = new DomainAdapter('www.gob.cl');

            expect(test.domain).to.not.equal('');
        });

        it('should return xn--mnchen-3ya.de for münchen.de', () => {
            let test = new DomainAdapter('münchen.de');

            expect(test.domain).to.equal('xn--mnchen-3ya.de');

        });

        it('should return example.com for subdomain.example.com', () => {
            let test = new DomainAdapter('subdomain.example.com');

            expect(test.domain).to.equal('example.com');

        });

        it('should return example.co.uk for subdomain.example.co.uk', () => {
            let test = new DomainAdapter('subdomain.example.co.uk');

            expect(test.domain).to.equal('example.co.uk');

        });

        it('should return empty string for nonexistent tld', () => {
            let test = new DomainAdapter('domain.nonexistent');

            expect(test.domain).to.equal('');

        });

    });

    describe('subdomain', () => {

        it('should return empty string for empty string', () => {
            let test = new DomainAdapter('');

            expect(test.subdomain).to.equal('');

        });

        it('should return empty string for no param', () => {
            let test = new DomainAdapter();

            expect(test.subdomain).to.equal('');

        });

        it('should return empty string for example.com', () => {
            let test = new DomainAdapter('example.com');

            expect(test.subdomain).to.equal('');

        });

        it('should return subdomain for subdomain.example.com', () => {
            let test = new DomainAdapter('subdomain.example.com');

            expect(test.subdomain).to.equal('subdomain');

        });

        it('should return subdomain for www.subdomain.example.com', () => {
            let test = new DomainAdapter('www.subdomain.example.com');

            expect(test.subdomain).to.equal('subdomain');

        });

        it('should return empty string for www.example.com', () => {
            let test = new DomainAdapter('www.example.com');

            expect(test.subdomain).to.equal('');

        });

        it('should return empty string for nonexistent tld', () => {
            let test = new DomainAdapter('sub.domain.nonexistent');

            expect(test.subdomain).to.equal('');

        });

    });

    describe('path', () => {

        it('should return / for empty string', () => {
            let test = new DomainAdapter('');

            expect(test.path).to.equal('/');

        });

        it('should return / for no param', () => {
            let test = new DomainAdapter();

            expect(test.path).to.equal('/');

        });

        it('should return / for example.com', () => {
            let test = new DomainAdapter('example.com');

            expect(test.path).to.equal('/');

        });


        it('should return /path for example.com/path', () => {
            let test = new DomainAdapter('example.com/path');

            expect(test.path).to.equal('/path');

        });

        it('should return /path for http://example.com/path', () => {
            let test = new DomainAdapter('http://example.com/path');

            expect(test.path).to.equal('/path');

        });

    });

    describe('commondomain', () => {
        it('should return empty string for empty input', async () => {
            let test = new DomainAdapter('');

            expect(test.commondomain).to.equal('');

        });

        it('should return subdomain domain and path', async () => {
            let test = new DomainAdapter('http://sub.domain.com/path');

            expect(test.commondomain).to.equal('sub.domain.com/path');

        });

        it('should return domain', async () => {
            let test = new DomainAdapter('http://domain.com');

            expect(test.commondomain).to.equal('domain.com');

        });

        it('should return subdomain domain', async () => {
            let test = new DomainAdapter('http://sub.domain.com');

            expect(test.commondomain).to.equal('sub.domain.com');

        });

        it('should return domain and path', async () => {
            let test = new DomainAdapter('http://domain.com/path');

            expect(test.commondomain).to.equal('domain.com/path');

        });

        it('should return strip last slash', async () => {
            let test = new DomainAdapter('http://sub.domain.com/path/');

            expect(test.commondomain).to.equal('sub.domain.com/path');

        });

        it('should return strip anything after first slash', async () => {
            let test = new DomainAdapter('http://sub.domain.com/path/something');

            expect(test.commondomain).to.equal('sub.domain.com/path');

        });

        it('should return strip anything after first slash and last slash', async () => {
            let test = new DomainAdapter('http://sub.domain.com/path/something/');

            expect(test.commondomain).to.equal('sub.domain.com/path');

        });

        it('should handle queries', async () => {
            let test = new DomainAdapter('http://sub.domain.com/path/something/?query=value');

            expect(test.commondomain).to.equal('sub.domain.com/path');

        });
    });

    describe('hostname', () => {
        it('should return domain and subdomain', async () => {
            let test = new DomainAdapter('sub.example.com');

            expect(test.hostname).to.equal('sub.example.com');

        });

        it('should return domain', async () => {
            let test = new DomainAdapter('example.com');

            expect(test.hostname).to.equal('example.com');

        });

        it('should return empty string for nonexistent tld', async () => {
            let test = new DomainAdapter('example.nonexistent');

            expect(test.hostname).to.equal('');

        });
    });

    describe('valid', () => {
        describe('prototype method', () => {
            it('should return false for nonexistent tld', async () => {
                let test = new DomainAdapter('example.nonexistent');

                expect(test.valid).to.equal(false);

            });

            it('should return false for valid domain', async () => {
                let test = new DomainAdapter('example.com');

                expect(test.valid).to.equal(true);

            });
        });

        describe('static method', () => {
            it('should return false for nonexistent tld', async () => {
                let test = DomainAdapter.valid('example.nonexistent');

                expect(test).to.equal(false);

            });

            it('should return true for valid domain', async () => {
                let test = DomainAdapter.valid('example.com');

                expect(test).to.equal(true);

            });

            it('should return false for empty domain', async () => {
                let test = DomainAdapter.valid('');

                expect(test).to.equal(false);

            });

            it('should return false for no params', async () => {
                let test = DomainAdapter.valid();

                expect(test).to.equal(false);

            });
        });

    });
});

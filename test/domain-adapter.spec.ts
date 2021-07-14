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


        it('should return example.com for example.com', () => {
            let test = new DomainAdapter('example.com');

            expect(test.domain).to.equal('example.com');

        });

        it('should return example.co.uk for example.co.uk', () => {
            let test = new DomainAdapter('example.co.uk');

            expect(test.domain).to.equal('example.co.uk');

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

            it('should return false for valid domain', async () => {
                let test = DomainAdapter.valid('example.com');

                expect(test).to.equal(true);

            });
        });

    });
});

const vows = require('vows');
const assert = require('assert');
const { CookieJar } = require('../lib/cookie');

vows.describe('Prototype Pollution Fix')
    .addBatch({
        'When using CookieJar': {
            topic: function () {
                const jar = new CookieJar(undefined, { rejectPublicSuffixes: false });

                try {
                    // Attempt to set a cookie with a polluted domain
                    jar.setCookieSync(
                        'Slonser=polluted; Domain=__proto__; Path=/notauth',
                        'https://__proto__/admin'
                    );
                } catch (e) {
                    // If there's an exception, pass it to the callback
                    return e;
                }
                return jar;
            },
            'it should prevent prototype pollution via __proto__': function (err, jar) {
                assert.ifError(err); // Ensure no unexpected errors occurred

                // Use Object.create(null) to simulate the idx structure
                const a = {};

                // Check that no properties are added to `a` via prototype pollution
                assert.strictEqual(
                    Reflect.has(a, '/notauth'),
                    false,
                    'Prototype was polluted !'
                );
            }
        }
    })
    .export(module);

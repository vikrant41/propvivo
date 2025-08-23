import React from "react";
import TopBanner from "../components/CommonComponents/TopBanner";

const cookies = () => {
  return (
    <>
      <TopBanner backgroundImage="./img/aboutBanner.jpg" title="Cookies" />
      <section className="py-12 md:py-16">
        <div className="container relative">
          <div className="prose max-w-none">
            <h5>Cookie Policy for propVIVO</h5>
            <p>
              This is the Cookie Policy for propVIVO, accessible from{" "}
              <a
                href="https://www.propvivo.com"
                className="text-accent1 underline"
              >
                www.propvivo.com
              </a>
            </p>

            <h5>What Are Cookies</h5>
            <p>
              As is common practice with almost all professional websites this
              site uses cookies, which are tiny files that are downloaded to
              your computer, to improve your experience. This page describes
              what information they gather, how we use it and why we sometimes
              need to store these cookies. We will also share how you can
              prevent these cookies from being stored however this may downgrade
              or 'break' certain elements of the site’s functionality.
            </p>
            <p>
              For more general information on cookies see the{" "}
              <a
                href="https://en.wikipedia.org/wiki/HTTP_cookie"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent1 underline"
              >
                Wikipedia article on HTTP Cookies
              </a>
              .
            </p>

            <h5>How We Use Cookies</h5>
            <p>
              We use cookies for a variety of reasons detailed below.
              Unfortunately in most cases there are no industry standard options
              for disabling cookies without completely disabling the
              functionality and features they add to this site. It is
              recommended that you leave on all cookies if you are not sure
              whether you need them or not in case they are used to provide a
              service that you use.
            </p>

            <h5>Disabling Cookies</h5>
            <p>
              You can prevent the setting of cookies by adjusting the settings
              on your browser (see your browser Help for how to do this). Be
              aware that disabling cookies will affect the functionality of this
              and many other websites that you visit. Disabling cookies will
              usually result in also disabling certain functionality and
              features of this site. Therefore it is recommended that you do not
              disable cookies.
            </p>

            <h5>The Cookies We Set</h5>
            <p>
              <strong>Account related cookies</strong> <br />
              If you create an account with us then we will use cookies for the
              management of the signup process and general administration. These
              cookies will usually be deleted when you log out however in some
              cases they may remain afterwards to remember your site preferences
              when logged out.
            </p>
            <p>
              <strong>Login related cookies</strong> <br />
              We use cookies when you are logged in so that we can remember this
              fact. This prevents you from having to log in every single time
              you visit a new page. These cookies are typically removed or
              cleared when you log out to ensure that you can only access
              restricted features and areas when logged in.
            </p>
            <p>
              <strong>Email newsletters related cookies</strong> <br />
              This site offers newsletter or email subscription services and
              cookies may be used to remember if you are already registered and
              whether to show certain notifications which might only be valid to
              subscribed/unsubscribed users.
            </p>

            <h5>More Information</h5>
            <p>
              Hopefully that has clarified things for you and as was previously
              mentioned if there is something that you aren't sure whether you
              need or not it's usually safer to leave cookies enabled in case it
              does interact with one of the features you use on our site.
            </p>
            <p>
              However if you are still looking for more information then you can
              contact us through one of our preferred contact methods:
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:services@propvivo.com"
                className="text-accent1 underline"
              >
                services@propvivo.com
              </a>
              <br />
              <strong>Website:</strong>{" "}
              <a
                href="https://www.propvivo.com"
                className="text-accent1 underline"
              >
                www.propvivo.com
              </a>
              <br />
              <strong>Phone:</strong> +1 (888) 392-3515
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default cookies;

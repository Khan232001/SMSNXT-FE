import React from "react";

const Footer = () => {
  return (
    <footer
      className="py-8"
      style={{
        background: "linear-gradient(to right, #002744, #005792)",
      }}
    >
      <div className="container mx-auto px-6 lg:px-16 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0">
          {/* Main Content */}
          <div className="text-center lg:text-left space-y-4 max-w-3xl">
            <p className="text-sm leading-relaxed">
              SmsNxt® is a 100% opt-in service. Please see our{" "}
              <a
                href="/policy"
                className="underline decoration-dotted hover:decoration-solid"
              >
                Privacy Policy
              </a>
              ,{" "}
              <a
                href="/terms"
                className="underline decoration-dotted hover:decoration-solid"
              >
                Terms Of Service
              </a>
              ,{" "}
              <a
                href="#"
                className="underline decoration-dotted hover:decoration-solid"
              >
                Services Policy
              </a>{" "}
              &{" "}
              <a
                href="#"
                className="underline decoration-dotted hover:decoration-solid"
              >
                Anti-Spam Policy
              </a>{" "}
              to learn about our position on SPAM and the privacy of your data.
              Msg & data rates may apply in the US. Standard message and data
              rates apply in Canada. To unsubscribe from an SmsNXT® list,
              simply text ‘STOP’ to the originating short code or contact{" "}
              <a
                href="mailto:support@smsnxt.com"
                className="underline decoration-dotted hover:decoration-solid"
              >
                support@smsnxt.com
              </a>
              . SmsNxt® neither provides lists of phone numbers nor do we
              access our clients' contact lists.
            </p>
          </div>

          {/* Trademark Section */}
          <div className="text-center">
            <p className="text-sm font-semibold">
              SmsNxt® is a registered trademark of bluBYT Tech Inc.
            </p>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="mt-8 border-t border-white/25 pt-4 text-center">
          <p className="text-xs text-gray-300">
            © {new Date().getFullYear()} SmsNxt®. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

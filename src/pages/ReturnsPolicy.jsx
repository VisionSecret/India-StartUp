import React from "react";
import { Link } from "react-router-dom";
import {
  FiPackage,
  FiTruck,
  FiRefreshCw,
  FiDollarSign,
  FiRepeat,
  FiMail,
} from "react-icons/fi";
import Breadcrumbs from "../components/Breadcrumbs";

const ReturnsPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Returns & Order Policy
        </h1>
        <p className="text-lg text-gray-600">
          We make returns easy and stress-free
        </p>
      </div>

      <div className="space-y-8">
        <PolicySection
          icon={<FiPackage className="w-6 h-6" />}
          title="Order Processing"
        >
          <div className="space-y-4">
            <PolicyPoint
              title="Order Confirmation"
              text="Once your order is placed, you'll receive a confirmation email with order details."
            />
            <PolicyPoint
              title="Processing Time"
              text="Typically 1-3 business days. May take longer during peak seasons."
            />
          </div>
        </PolicySection>

        <PolicySection
          icon={<FiTruck className="w-6 h-6" />}
          title="Shipping Information"
        >
          <div className="space-y-4">
            <PolicyPoint
              title="Shipping Methods"
              text="Various options available at checkout with different delivery times."
            />
            <PolicyPoint
              title="Tracking"
              text="Tracking number sent via email once your order ships."
            />
          </div>
        </PolicySection>

        <PolicySection
          icon={<FiRefreshCw className="w-6 h-6" />}
          title="Returns"
          highlightColor="bg-green-100"
        >
          <div className="space-y-4">
            <PolicyPoint
              title="30-Day Returns"
              text="Items must be unused, in original packaging with all tags attached."
              highlight
            />
            <PolicyPoint
              title="Exclusions"
              text="Sale items, custom products, and gift cards cannot be returned."
            />
          </div>
        </PolicySection>

        <PolicySection
          icon={<FiRepeat className="w-6 h-6" />}
          title="Return Process"
        >
          <ol className="space-y-6 pl-6">
            <Step
              number="1"
              title="Contact Us"
              text={
                <>
                  Email{" "}
                  <Link
                    to="mailto:support@bagbasket.com"
                    className="text-blue-600 hover:underline"
                  >
                    support@bagbasket.com
                  </Link>{" "}
                  with order number and reason
                </>
              }
            />
            <Step
              number="2"
              title="Return Label"
              text="We provide labels for our errors. Customer-paid returns otherwise"
            />
            <Step
              number="3"
              title="Ship Back"
              text="Pack securely with original packaging and order confirmation"
            />
          </ol>
        </PolicySection>

        <PolicySection
          icon={<FiDollarSign className="w-6 h-6" />}
          title="Refunds"
        >
          <div className="space-y-4">
            <PolicyPoint
              title="5-7 Day Processing"
              text="Refunds issued to original payment method after inspection"
            />
            <PolicyPoint
              title="Exchanges"
              text="Return original item and place new order for size/color changes"
            />
          </div>
        </PolicySection>

        <div className="bg-blue-50 rounded-xl p-8 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full text-white mb-4">
            <FiMail className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Need Help?</h3>
          <p className="text-gray-600">
            Contact our support team at{" "}
            <Link
              to="mailto:support@bagbasket.com"
              className="text-blue-600 hover:underline font-medium"
            >
              support@bagbasket.com
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const PolicySection = ({
  icon,
  title,
  children,
  highlightColor = "bg-blue-50",
}) => (
  <div className={`${highlightColor} rounded-xl p-8`}>
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-sm">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
    {children}
  </div>
);

const PolicyPoint = ({ title, text, highlight = false }) => (
  <div className={`${highlight ? "bg-white p-4 rounded-lg shadow-sm" : ""}`}>
    <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{text}</p>
  </div>
);

const Step = ({ number, title, text }) => (
  <li className="relative pb-6 pl-8 border-l-2 border-blue-200">
    <div className="absolute w-8 h-8 bg-blue-600 rounded-full -left-4 flex items-center justify-center text-white font-bold">
      {number}
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{text}</p>
  </li>
);

export default ReturnsPolicy;

import React from "react";
import { Mail, Phone, MessageCircle, HelpCircle, FileText, Users } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Support & Help</h1>
          <p className="text-gray-600">Get help with your IT hardware needs and technical support</p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Mail className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Email Support</h3>
            </div>
            <p className="text-gray-600 mb-4">Send us an email for general inquiries and support</p>
            <a href="mailto:it-support@ea.com" className="text-blue-600 hover:text-blue-800 font-medium">
              it-support@ea.com
            </a>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Phone className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Phone Support</h3>
            </div>
            <p className="text-gray-600 mb-4">Call us for urgent technical support</p>
            <a href="tel:+1-800-555-0123" className="text-blue-600 hover:text-blue-800 font-medium">
              +1-800-555-0123
            </a>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <MessageCircle className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Live Chat</h3>
            </div>
            <p className="text-gray-600 mb-4">Chat with our support team in real-time</p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Start Chat
            </button>
          </div>
        </div>

        {/* Help Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <HelpCircle className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">FAQ</h3>
            </div>
            <p className="text-gray-600 mb-4">Find answers to commonly asked questions</p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Browse FAQ
            </button>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Documentation</h3>
            </div>
            <p className="text-gray-600 mb-4">Access product manuals and technical guides</p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              View Docs
            </button>
          </div>
        </div>

        {/* Support Team */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <Users className="h-8 w-8 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Our Support Team</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Our dedicated IT support team is available to help you with hardware selection, 
            technical issues, and any questions about our products and services.
          </p>
          <div className="text-sm text-gray-500">
            <p>• Business Hours: Monday - Friday, 9:00 AM - 6:00 PM PST</p>
            <p>• Emergency Support: Available 24/7 for critical issues</p>
            <p>• Response Time: We aim to respond to all inquiries within 2 business hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}

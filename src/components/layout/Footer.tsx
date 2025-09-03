import React from 'react';
import Link from 'next/link';
import { Twitter, Linkedin, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Top Section - Navigation Links */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 py-12">
        <div className="flex flex-col items-start md:flex-row gap-8">
          {/* Logo */}
          <div className="flex items-center mb-6 md:mb-0">
            <img src="/logo/ea_world_logo_blue.svg" alt="EA World" className="h-10 object-contain" />
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
            {/* Leadership */}
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Leadership</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">Mission</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">Values</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">Code of Ethics</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">Our Team</Link></li>
              </ul>
            </div>

            {/* Marketing */}
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Marketing</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">Media Relations</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">Press Releases</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">Brand Library</Link></li>
              </ul>
            </div>

            {/* Diversity and Inclusion */}
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Diversity and Inclusion</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">Purpose</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">Employee Networks</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">Events</Link></li>
              </ul>
            </div>

            {/* Social Responsibilities */}
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Social Responsibilities</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">Global Impact</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">Community</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">Campaigns</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">Report a violation</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="border-t border-gray-200"></div>

      {/* Bottom Section - Legal & Copyright */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Legal Links */}
          <div className="flex gap-6">
            <Link href="#" className="text-gray-600 hover:text-gray-900 text-xs">
              Terms and conditions
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 text-xs">
              Privacy policy
            </Link>
          </div>

          {/* Social Media & Copyright */}
          <div className="flex items-center gap-4">

            {/* Copyright Text */}
            <div className="text-gray-600 text-xs">
              © 2025 Electronic Arts Inc. This portal is authorized for EA employees, approved contractors & partners only.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 
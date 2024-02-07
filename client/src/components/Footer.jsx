import { Footer } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import {BsFacebook , BsInstagram , BsTwitterX , BsGithub , BsLinkedin} from 'react-icons/bs'

export default function FooterCom() {
  return (
    <Footer container className="border border-t-4 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Felix's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Daily leetcode problems
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Felix's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.github.com/felixoder"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="https://www.instagram.com/felix__12_7?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  My Daily journey
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider/>
        <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright href="#" by="Felix's Blog" year={new Date().getFullYear()}/>
            <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                <Footer.Icon href="https://www.facebook.com/profile.php?id=100069657729867" icon={BsFacebook}/>
                <Footer.Icon href="https://www.instagram.com/felix__12_7?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" icon={BsInstagram}/>
                <Footer.Icon href="https://github.com/felixoder" icon={BsGithub}/>
                <Footer.Icon href="https://twitter.com/DebayanGho59742" icon={BsTwitterX}/>
                <Footer.Icon href="https://www.linkedin.com/in/debayan-ghosh-1671b4224/" icon={BsLinkedin}/>
                
            </div>
        </div>
      </div>
    </Footer>
  );
}

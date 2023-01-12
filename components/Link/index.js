import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const CustomLink = ({ href, children }) => {
  const router = useRouter();

  let className = children.props.className || "";
  if (router.pathname === href) {
    className = `${className} active`;
  }

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>;
};

export default CustomLink;

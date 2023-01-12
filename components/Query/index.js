import React, { useEffect } from "react";
import gsap from "gsap";
import styled from "styled-components";

const LoaderWrapper = styled.div`
  width: 100%;
  height: 3px;
  position: fixed;
  top: 0px;
  left: -100%;
  background-color: #fff;
  z-index: 999999;
`;

const Loader = () => {
  useEffect(() => {
    let tl = gsap.timeline({
      repeat: -1,
    });
    tl.to("#loader", {
      delay: 0.2,
      x: "200%",
      duration: 2.5,
      ease: "Power1.easeInOut",
    });
    // tl.to("#loader", {
    //   x: 0,
    //   duration: 2.5,
    //   ease: "Power1.easeIn"
    // });
    return () => {};
  }, []);
  return <LoaderWrapper id="loader"></LoaderWrapper>;
};

const Query = ({ children, query, id }) => {
  const { data, loading, error } = useQuery(query, {
    variables: { id: parseInt(id) },
  });
  if (loading) return <Loader></Loader>;
  if (error) return <div>{error}</div>;
  return children({ data });
  // return <Loader></Loader>;
};

export default Query;

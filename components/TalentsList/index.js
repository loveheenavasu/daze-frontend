import styled from "styled-components";
import { shuffle } from "../../utils";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import locale from "./locale";
import Card from "./Card";
import Search from "./Search";
import { useRouter } from "next/router";

import Fuse from "fuse.js";

const chunkArray = (arrPhotos, size) => {
  let arr = [...arrPhotos];
  let results = [];
  // let results = [];
  if (size === null) size = 1;
  let modulo = arr.length % size;
  let division = (arr.length - modulo) / size;
  for (var i = 0; i < size; i++) {
    results.push([]);
  }
  arr.forEach((item, i) => {
    results[i % size].push(item);
  });
  return results;
};

const Column = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  /* overflow-y: hidden;
  overflow-x: visible; */
  width: ${({ nbrCol }) => `calc(100% /${nbrCol})`};
  margin-top: ${({ colIndex }) => (colIndex % 2 === 0 ? "200px" : 0)};
  &:last-child {
    margin-bottom: 15px;
  }
  @media (max-width: 960px) {
    margin: 0;
    /* width: ${({ nbrCol }) => `calc(100% /${nbrCol})`}; */
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow-x: hidden;
  margin-top: 110px;
  overflow-x: hidden;
`;

const Button = styled.div`
  display: inline-block;
  margin: 100px 0;
  border: 1px solid #000;
  align-self: center;
  background-color: #fff;
  transition: background-color 0.2s ease;
  a  {
    display: inline-block;
    padding: 20px 40px;
    text-decoration: none;
    color: #000;
    font-family: "SackersGothicStd-Heavy";
    font-size: 14px;
    text-transform: lowercase;
    transition: color 0.2s ease;
  }
  &:hover {
    background-color: #000;
    a {
      color: #fff;
      /* transform: scale(1.05); */
    }
  }
`;

const TalentsList = ({ talents, lang }) => {
  const router = useRouter();
  const searchQuery = [...talents];
  const [search, setSearch] = useState(router.query.search || "");
  const shuffleArray = shuffle(searchQuery);
  // let nbrCol = ;
  let [nbrCol, setNbrCol] = useState(4);
  const [screenMode, setScreenMode] = useState("desktop");
  const [sortAlph, setSort] = useState(null);
  const [talentsState, setTalents] = useState([]);
  const [filter, setFilter] = useState({
    min: router.query.min || null,
    max: router.query.max || null,
  });
  const filtersFollowers = (arr) => {
    // console.log("min: ", filter.min, "max: ", filter.max);
    return arr.filter((talent) => {
      if (filter.min !== null && filter.max !== null) {
        // console.log("max + min");
        return talent.followers >= filter.min && talent.followers <= filter.max;
      } else if (filter.min !== null && filter.max === null) {
        // console.log("min");
        return talent.followers >= filter.min;
      } else if (filter.max !== null && filter.min === null) {
        // console.log("max ");
        return talent.followers <= filter.max;
      } else {
        // console.log("none");
        return true;
      }
    });
  };

  useEffect(() => {
    if (filter.max !== null || filter.min !== null) {
      const talentsList = chunkArray(filtersFollowers(shuffleArray), nbrCol);
      setTalents(talentsList);
    } else {
      const talentsList = chunkArray(shuffleArray, nbrCol);
      setTalents(talentsList);
    }
  }, []);

  useEffect(() => {
    if (window) {
      window.innerWidth > 960
        ? setScreenMode("desktop")
        : setScreenMode("mobile");
      window.onresize = () => {
        if (window.innerWidth > 960 && nbrCol !== 4) {
          setNbrCol(4);
        } else if (window.innerWidth <= 960 && nbrCol !== 1) {
          setNbrCol(1);
        }
        if (window && window.innerWidth > 960 && screenMode !== "desktop") {
          setScreenMode("desktop");
        } else if (
          window &&
          window.innerWidth < 960 &&
          screenMode !== "mobile"
        ) {
          setScreenMode("mobile");
        }
      };
    }
  }, []);

  useEffect(() => {
    if (nbrCol !== null && router.query.search !== "") {
      const newTalentsList = chunkArray(talentsState.flat(), nbrCol);
      setTalents(newTalentsList);
    }
  }, [nbrCol]);

  useEffect(() => {
    if (screenMode === "desktop") {
      setNbrCol(4);
    } else if (screenMode === "mobile") {
      setNbrCol(1);
    }
  }, [screenMode]);

  useEffect(() => {
    if (search !== "") {
      setFilter({ min: null, max: null });
    }
    router.push(
      {
        pathname: "/talents",
        query: {
          ...router.query,
          search: search,
        },
      },
      `/talents`,
      {
        shallow: true,
      }
    );
  }, [search]);

  useEffect(() => {
    if (filter.max !== null || !filter.min !== null) {
      setSearch("");
    }
    if (filter.max !== null || filter.min !== null) {
      router.push(
        {
          pathname: "/talents",
          query: {
            ...router.query,
            max: filter.max,
            min: filter.min,
          },
        },
        "/talents",
        {
          shallow: true,
        }
      );
      setTalents(
        chunkArray(
          filtersFollowers(shuffleArray).sort(
            (a, b) => a.followers - b.followers
          ),
          nbrCol
        )
      );
    } else {
      setTalents(chunkArray(filtersFollowers(shuffleArray), nbrCol));
    }
  }, [filter.min, filter.max]);

  useEffect(() => {
    // filterByFollowers();
    setFilter({
      min: Number(router.query.min) === 0 ? null : Number(router.query.min),
      max: Number(router.query.max) === 0 ? null : Number(router.query.max),
    });
  }, [router.query.min, router.query.max]);

  useEffect(() => {
    let options = {
      keys: ["firstname", "lastname", "instagram_id"],
      tokenize: true,
      maxPatternLength: 32,
      includeScore: true,
      minMatchCharLength: 1,
      threshold: 0,
    };
    var fuse = new Fuse(talents, options);
    if (search !== "") {
      let searchTalentResult = fuse.search(search);
      // console.log(searchTalentResult);
      setSort(true);
      setTalents(
        chunkArray(
          searchTalentResult.map((talent) => {
            return talent.item;
          }),
          nbrCol
        )
      );
      // console.log(talentsState);
    } else if (search === "" && filter.max === null && filter.min === null) {
      setTalents(chunkArray(shuffleArray, nbrCol));
    }
  }, [router.query.search]);

  useEffect(() => {
    if (sortAlph !== null) {
      let sortArr = talentsState.flat().sort((a, b) => {
        if (a.firstname < b.firstname) {
          return sortAlph === true ? -1 : 1;
        }
        if (a.firstname > b.firstname) {
          return sortAlph === true ? 1 : -1;
        }
        return 0;
      });
      let list = chunkArray(sortArr, nbrCol);
      setTalents(list);
    }
  }, [sortAlph]);
  const setAlphabetically = () => {};
  return (
    <Wrapper>
      <Search
        setSearch={setSearch}
        setAlphabetically={setAlphabetically}
        sortAlph={sortAlph}
        setSort={setSort}
        setFilter={setFilter}
        filter={filter}
        lang={lang}
        search={search}
      ></Search>
      {nbrCol !== null &&
        talentsState.map((col, colIndex) => (
          <Column
            colIndex={colIndex}
            nbrCol={nbrCol}
            // style={{
            //   width: `calc(100% / ${nbrCol})`
            // }}
          >
            {col.map((talent, i) => (
              <Card
                talent={talent}
                index={i}
                colIndex={colIndex}
                nbrCol={nbrCol}
              ></Card>
            ))}
          </Column>
        ))}
      <center style={{ width: "100%" }}>
        <Button>
          <Link
            href={{
              pathname: "contact",
              query: {
                subject:
                  lang === "fr" ? "Voir plus de talents" : "See more talents",
              },
            }}
          >
            {locale[lang].moreTalents}
          </Link>
        </Button>
      </center>
    </Wrapper>
  );
};

// const TalentsList = props => {
//   useEffect(() => {
//     console.log(props);
//   }, []);
//   return <div></div>;
// };

export default TalentsList;

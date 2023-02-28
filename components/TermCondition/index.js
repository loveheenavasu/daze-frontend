import styled from "styled-components";
const ReactMarkdown = require("react-markdown");

const termCondition=(props)=>{
    const { lang, term } = props;

    // console.log("term",term)

    // const replaceSlashN = (str) => {
    //     return str?.replace(/\n/g,'<br />');
    //   }

    const termPolicy = (lang === 'en' ? term.body_en : term.body_fr)

    const Wrapper = styled.div`
    width:100%;
    text-align: left;
    padding-top: 10px;`
    const Heading = styled.div`
    padding: 0px 60px;
    `;
    const Container = styled.div`
    .termbody{
        padding: 10px 60px;
    }
    strong{
        font-weight:bold;
    }
    `;
return(
    <Wrapper>
    <Heading>
        <h2>{lang === 'en' ? term.title_en : term.title_fr}</h2>
        {/* <h2>
        <ReactMarkdown source= {lang === 'en' ? term.title_en : term.title_fr} />
        </h2> */}
    </Heading>
    <Container>
        <div className="termbody">
            <p>
                <ReactMarkdown source={termPolicy} />
            </p>
        {/* <p dangerouslySetInnerHTML={{__html: termPolicy}}></p> */}
        </div>
    </Container>
    </Wrapper>
)
}

export  default termCondition;
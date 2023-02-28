import styled from "styled-components";
import { Container } from "../Defaults";
const ReactMarkdown = require("react-markdown");

const policyOfUse=(props)=>{
    const{lang, policyData} = props;

    // console.log("ploicy",policyData)


    const policyTerm = (lang === 'en' ? policyData.body_en : policyData.body_fr)

    const Wrapper = styled.div`
    width:100%;
    text-align: left;
    padding-top: 10px;
    `;
    const Heading = styled.div`
    padding: 0px 60px;
    `;
    const Container = styled.div`
    .policybody{
        padding: 10px 60px;
    }
    strong{
        font-weight:bold;

    }
    `;
    return(
        <Wrapper>
            <Heading>
                <h2>{lang === 'en' ? policyData.title_en : policyData.title_fr}</h2>
            </Heading>
            <Container>
                <div className= 'policybody'>
                    <p >
                        <ReactMarkdown  source={policyTerm}/>
                    </p>
                </div>
            </Container>
        </Wrapper>
    )

}
export default policyOfUse;
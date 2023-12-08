import styled from "styled-components";

export const InputPrependText = styled.label`
    display: inline-block;
    position: absolute;
    line-height: 1;
    top: 50%;
    margin-top: -0.5rem;
    left: 40px;
    color:${props => props.color || 'inherit'};
`
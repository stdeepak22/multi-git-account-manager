import styled from "styled-components";

export const InputLikeDiv = styled.div`
    font-family: ${props => props.fontFamily};
    border: 1px solid var(--surface-400);
    border-radius: 4px;
    padding: 0.6rem 0.75rem;
`

export const UnderlineChip = styled.span`
    border-bottom: 2px solid var(--primary-400);
    font-family: monospace;
    min-width:${props => props.minLength || `0px`};
    display:inline-block;
    padding: 0px 5px;
`
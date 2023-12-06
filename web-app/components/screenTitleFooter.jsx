import styled from 'styled-components';

export const ScreenTitle = styled.div({
    textAlign: 'center',
    fontWeight: 500,
    fontSize: 20,
    padding: 10,
    height: 50,
    color: `var(--primary-color-text)`,
    background: `linear-gradient(45deg, #556eff, #fc65c8)`,
})

export const ScreenFooter = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;
    height: 50px;
    border-top: 1px solid var(--surface-200);
    justify-content: ${props => props.$footerAlign === 'start' ? 'start' : props.$footerAlign === 'end' ? 'end' : 'center'};
`
import styled from 'styled-components';
   
export const Box = styled.div`
  padding: 10px 10px;
  box-shadow: 5px 5px 10px 2px rgba(0,0,0,.8);
  background: white;
  position: absolute;
  bottom: 0;
  width: 100%;
  
  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;
   
// export const Container = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     max-width: 1000px;
//     margin: 0 auto;
//     /* background: red; */
// `
   
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
`;
   
export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 
                         minmax(500px, 1fr));
  grid-gap:150px;
   
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, 
                           minmax(500px, 1fr));
  }
`;
   
export const FooterLink = styled.a`
  color: #000;
  margin-bottom: 20px;
  font-size: 20px;
  text-decoration: none;
   
  &:hover {
      color: #C82826;
      transition: 200ms ease-in;
  }
`;
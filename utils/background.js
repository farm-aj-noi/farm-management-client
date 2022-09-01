import styled from "styled-components";
import bgFarmAll from "../images/backgrounds/backgroundbeforelogin.jpg";
import bgFarm from "../images/backgrounds/mt01.jpg";
import bgFarmtest from "../images/backgrounds/123unnamsed.jpg";
import bgstore from "../images/backgrounds/backgroundstore.jpg";
import bggrade from "../images/backgrounds/backgroundgrade.jpg";
import bgproduct from "../images/backgrounds/backgroundproduct.jpg";
import bgstoreall from "../images/backgrounds/backgroundstoreall.png"

export const BackgroundEmpty = styled.div`
  background-color: #ffffff; /*ดึงรูป*/
  position: absolute; /*ไม่ให้ตำแหน่งเปลี่ยน*/
  top: 0; /*ให้มันเริ่มที่จุดบนสุด*/
  width: 100%; /*ขนาดรูปจริง 100%*/
  height: 100%; /*ขนาดรูปจริง 100%*/
  background-repeat: no-repeat; /*ไม่ให้รูปวนซ้ำ */
  background-size: cover; /*ขนาดรูปให้เท่าหน้าจอ*/
  background-position: 50% 50%; /*ลดตำแหน่งให้รูปมันพอดี*/
  overflow-y: scroll;
`;

export const BackgroundFarmAll = styled.div`
  background-image: url(${bgFarmAll}); /*ดึงรูป*/
  position: absolute; /*ไม่ให้ตำแหน่งเปลี่ยน*/
  top: 0; /*ให้มันเริ่มที่จุดบนสุด*/
  width: 100%; /*ขนาดรูปจริง 100%*/
  height: 100%; /*ขนาดรูปจริง 100%*/
  background-repeat: no-repeat; /*ไม่ให้รูปวนซ้ำ */
  background-size: cover; /*ขนาดรูปให้เท่าหน้าจอ*/
  background-position: 50% 50%; /*ลดตำแหน่งให้รูปมันพอดี...*/
  overflow-y: scroll;
`;
export const BackgroundCow = styled.div`
  background-image: url(${bgFarm}); /*ดึงรูป*/
  position: absolute; /*ไม่ให้ตำแหน่งเปลี่ยน*/
  top: 0; /*ให้มันเริ่มที่จุดบนสุด*/
  width: 100%; /*ขนาดรูปจริง 100%*/
  height: 100%; /*ขนาดรูปจริง 100%*/
  background-repeat: no-repeat; /*ไม่ให้รูปวนซ้ำ */
  background-size: cover; /*ขนาดรูปให้เท่าหน้าจอ*/
  background-position: 50% 50%; /*ลดตำแหน่งให้รูปมันพอดี*/
  overflow-y: scroll;
`;

export const Backgroundtest = styled.div`
  background-image: url(${bgFarmtest}); /*ดึงรูป*/
  position: absolute; /*ไม่ให้ตำแหน่งเปลี่ยน*/
  top: 0; /*ให้มันเริ่มที่จุดบนสุด*/
  width: 100%; /*ขนาดรูปจริง 100%*/
  height: 100%; /*ขนาดรูปจริง 100%*/
  background-repeat: no-repeat; /*ไม่ให้รูปวนซ้ำ */
  background-size: cover; /*ขนาดรูปให้เท่าหน้าจอ*/
  background-position: 50% 50%; /*ลดตำแหน่งให้รูปมันพอดี*/
  overflow-y: scroll;
`;

export const BackgroundStore = styled.div`
  background-image: url(${bgstore}); /*ดึงรูป*/
  position: absolute; /*ไม่ให้ตำแหน่งเปลี่ยน*/
  top: 0; /*ให้มันเริ่มที่จุดบนสุด*/
  width: 100%; /*ขนาดรูปจริง 100%*/
  height: 100%; /*ขนาดรูปจริง 100%*/
  background-repeat: no-repeat; /*ไม่ให้รูปวนซ้ำ */
  background-size: cover; /*ขนาดรูปให้เท่าหน้าจอ*/
  background-position: 50% 50%; /*ลดตำแหน่งให้รูปมันพอดี*/
  overflow-y: scroll;
`;

export const BackgroundProduct = styled.div`
  background-image: url(${bgproduct}); /*ดึงรูป*/
  position: absolute; /*ไม่ให้ตำแหน่งเปลี่ยน*/
  top: 0; /*ให้มันเริ่มที่จุดบนสุด*/
  width: 100%; /*ขนาดรูปจริง 100%*/
  height: 100%; /*ขนาดรูปจริง 100%*/
  background-repeat: no-repeat; /*ไม่ให้รูปวนซ้ำ */
  background-size: cover; /*ขนาดรูปให้เท่าหน้าจอ*/
  background-position: 50% 50%; /*ลดตำแหน่งให้รูปมันพอดี*/
  overflow-y: scroll;
`;
// export const backgroundFarmAll2 = styled.div`
//   background-image: ${bgFarmAll}; /*ดึงรูป*/
//   position: fixed; /*ไม่ให้ตำแหน่งเปลี่ยน*/
//   top: 0; /*ให้มันเริ่มที่จุดบนสุด*/
//   width: 100%; /*ขนาดรูปจริง 100%*/
//   height: 100%; /*ขนาดรูปจริง 100%*/
//   background-repeat: no-repeat; /*ไม่ให้รูปวนซ้ำ */
//   background-size: cover; /*ขนาดรูปให้เท่าหน้าจอ*/
//   background-position: 50% 50%; /*ลดตำแหน่งให้รูปมันพอดี*/
// `;
export const BackgroundGrade = styled.div`
  background-image: url(${bggrade}); /*ดึงรูป*/
  position: absolute; /*ไม่ให้ตำแหน่งเปลี่ยน*/
  top: 0; /*ให้มันเริ่มที่จุดบนสุด*/
  width: 100%; /*ขนาดรูปจริง 100%*/
  height: 100%; /*ขนาดรูปจริง 100%*/
  background-repeat: no-repeat; /*ไม่ให้รูปวนซ้ำ */
  background-size: cover; /*ขนาดรูปให้เท่าหน้าจอ*/
  background-position: 50% 50%; /*ลดตำแหน่งให้รูปมันพอดี*/
  overflow-y: scroll;
`;

export const BackgroundStoreAll = styled.div`
background-image: url(${bgstoreall}); /*ดึงรูป*/
position: absolute; /*ไม่ให้ตำแหน่งเปลี่ยน*/
top: 0; /*ให้มันเริ่มที่จุดบนสุด*/
width: 100%; /*ขนาดรูปจริง 100%*/
height: 100%; /*ขนาดรูปจริง 100%*/
background-repeat: no-repeat; /*ไม่ให้รูปวนซ้ำ */
background-size: cover; /*ขนาดรูปให้เท่าหน้าจอ*/
background-position: 50% 50%; /*ลดตำแหน่งให้รูปมันพอดี*/
overflow-y: scroll;
`;
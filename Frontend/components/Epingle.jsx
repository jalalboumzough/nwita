/*
      Réalisé par Rida Argan
*/
import * as React from "react";
const Epingler = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25px"
      height="25px"
      viewBox="0 0 35.000000 35.000000"
      preserveAspectRatio="xMidYMid meet"
      style={{
        fill: "#d64848",
      }}
      {...props}
    >
      <metadata>
        {"\nCreated by potrace 1.10, written by Peter Selinger 2001-2011\n"}
      </metadata>
      <g
        transform="translate(0.000000,35.000000) scale(0.100000,-0.100000)"
        fill=""
        stroke="none"
        style={{
          fill: "black",
        }}
      >
        <rect
          x={100.1328}
          y={150.7198}
          width={203}
          height={144}
          rx={24}
          transform="rotate(45 200.1328 250.7198)"
          style={{
            fill: props.ispang ? "#ffe500" : "white",
          }}
        />
        {/* <rect
          x={140.1328}
          y={140.7198}
          width={190}
          height={70}
          rx={24}
          transform="rotate(-45 200.1328 250.7198)"
          style={{
            fill: props.ispang ? "red" : "white",
          }}
        /> */}
        <path
          d="M208 305 c-26 -37 -37 -45 -64 -45 -17 0 -42 -9 -55 -19 l-24 -19 28 -30 28 -29 -62 -77 c-34 -42 -59 -79 -56 -83 4 -3 41 22 83 56 l77 62 29 -28 30 -28 19 24 c10 13 19 38 19 55 0 27 8 38 45 64 25 17 45 37 45 43 0 6 -20 31 -44 55 -24 24 -49 44 -55 44 -6 0 -26 -20 -43 -45z m87 -15 c33 -34 37 -42 25 -51 -8 -5 -30 -19 -47 -30 -27 -17 -33 -27 -33 -57 0 -67 -11 -66 -84 7 -72 73 -72 81 -3 81 27 0 37 8 62 45 17 25 32 45 35 45 3 0 24 -18 45 -40z m-147 -152 c-2 -6 -24 -27 -49 -47 -44 -35 -41 -28 15 37 21 23 40 30 34 10z"
          style={{}}
        />
      </g>
    </svg>
  );
};
export default Epingler;

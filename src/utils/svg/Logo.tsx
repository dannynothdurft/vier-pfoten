"use client";

function Logo({ width = "50px", height = "50px" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 2048 2048"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        transform="translate(532,100)"
        d="m0 0h49l24 2 37 6 28 7 32 11 25 11 19 10 18 11 18 13 14 11 13 12 15 15 11 14 10 13 15 25 9 19 8 22v2l36-5 35-3 46-2h32l49 2 43 4 40 6 21 4 1-5 13-33 12-23 10-15 9-12 11-13 11-12 16-15 14-11 18-13 15-9 24-13 26-11 33-11 29-7 31-5 24-2h50l24 2 34 5 28 7 25 9 24 11 22 12 15 10 11 8 12 9 13 11 8 7 10 9 20 20 7 8 12 14 15 20 11 14 13 18 11 18 9 14 12 20 13 24 14 26 12 26 9 20 12 28 17 44 14 41 11 35 12 42 11 45 9 43 6 39 2 22 1 20v32l-2 18-4 14-6 15-11 18-11 14-24 24-14 11-21 14-24 13-15 7-21 8-29 9-13 4h-3l4 17 13 71 5 37 5 49 2 36 1 28v52l-2 35-3 27-5 32-6 30-10 38-12 36-17 40-9 20-9 17-11 19-13 22-10 15-10 13-15 20-13 16-16 17-8 8-7 8-21 21-11 9-15 13-25 20-25 17-24 16-13 8-29 16-26 14-26 12-47 20-38 13-38 12-48 12-34 7-45 8-38 5-46 4-19 1-53 1h-43l-61-1-44-3-35-4-38-6-43-8-30-7-36-9-47-15-29-10-40-17-23-10-26-13-23-13-22-12-43-29-17-12-14-12-11-9-28-24-13-13-7-8-9-9-7-8-10-10-13-17-11-14-9-12-12-17-9-15-17-29-11-20-17-39-11-27-10-31-10-38-6-31-5-33-3-28-1-14-1-31v-22l2-66 4-49 6-54 9-56 5-27 1-7-10-4-26-10-25-12-19-11-16-11-16-13-8-7-11-11-10-13-9-13-5-9-7-15-6-20-3-22v-21l4-36 6-36 7-37 7-30 11-44 13-44 12-36 12-34 11-28 12-29 18-40 8-17 12-22 15-28 16-26 15-23 8-12 13-17 10-13 11-14 12-14 34-34 11-9 15-12 18-13 21-13 25-13 27-11 23-7 29-6 30-4zm4 123-19 2-27 5-20 6-28 14-18 12-14 11-13 12-8 7-11 11-9 11-10 11-10 13-12 16-10 15-15 24-14 24-12 22-11 23-15 32-15 37-11 29-10 29-9 27-10 35-10 38-10 46-8 49-1 13v25l3 6 11 12 8 7 10 7 18 10 17 7 16 6 20 5 33 5h44l31-4 25-6 20-6 25-10 20-10 20-12 16-11 10-8 12-11 8-7 11-11 9-11 7-8 12-17 11-17 12-22 14-30 9-21 7-13 10-11 14-8 9-3 13-2 15 1 13 4 12 7 10 10 7 11 4 10 2 10v13l-2 12-9 24-11 25-8 16-12 23-16 26-11 16-11 14-8 10-18 20-24 24-14 11-12 10-18 13-20 12-17 10-23 11-26 11-33 11-36 9-32 5-32 3-6 1-5 25-6 33-6 40-4 35-4 54-1 22v76l3 34 3 23 6 33 7 26 8 25 8 21 13 30 8 16 10 18 14 23 8 11 14 19 11 13 9 11 16 17 18 18 11 9 10 9 11 9 16 12 23 16 21 13 17 10 26 14 28 13 28 12 23 9 36 12 32 9 33 8 29 6 34 6 38 5 41 4 31 2h109l50-4 45-5 35-6 36-7 37-9 26-7 36-12 27-10 26-11 24-11 24-12 18-10 21-13 21-14 14-10 17-13 15-13 11-9 11-11 3-2v-2l4-2 9-10 9-9 9-11 12-14 14-19 14-21 17-29 11-22 11-26 8-21 5-16 6-21 6-26 5-31 4-38 1-31v-16l-1-43-2-30-5-50-6-40-4-21-8-40-5-20-3-6-33-5-26-6-30-9-17-6-21-9-28-13-21-13-17-11-12-9-13-11-11-9-24-24-7-8-10-12-14-19-12-17-14-24-14-26-15-33-11-28-5-16-1-7v-10l3-14 5-11 8-11 10-9 14-7 16-3h10l15 3 14 7 10 9 7 9 8 16 11 27 10 23 10 19 12 20 12 17 13 16 12 13 11 11 8 7 16 12 16 10 22 12 24 10 22 7 23 6 25 4 10 1h45l22-3 24-5 24-8 19-8 15-9 15-11 10-9 7-11 1-3v-21l-6-42-7-38-8-33-11-44-13-42-12-36-8-22-12-30-13-30-14-30-18-35-14-24-12-19-14-21-12-16-11-14-9-11-11-12-16-16-8-7-13-10-11-8-21-13-19-9-23-7-27-5-22-2h-36l-26 3-29 6-19 6-23 10-17 9-17 12-14 12-12 12-11 15-8 13-6 15-5 20-2 22-4 17-5 10-10 13-9 10-12 9-14 6-13 2-17-1-49-12-38-7-31-4-37-3-23-1h-38l-38 2-34 3-62 9-27 2h-12l-16-4-12-6-12-11-7-10-5-12-8-48-7-19-5-10-8-12-10-11-7-8-9-8-13-10-15-9-15-8-24-10-29-8-23-4-25-2z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        transform="translate(952,1362)"
        d="m0 0h116l28 1 14 3 13 7 12 11 9 14 5 16v21l-3 10-5 10-9 12-16 17-16 16h-2l-2 4-3 3h-2l-1 3-5 4-2 3h-2l-2 4-3 3h-2l-2 4-13 12-11 8-10 5-13 3h-18l-12-3-13-7-11-9-69-69-10-14-5-11-3-13v-12l4-16 7-13 7-9 8-7 16-8 9-2z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        transform="translate(1386,1149)"
        d="m0 0h21l13 4 9 5 10 8 8 9 8 16 2 7 1 11v51l-2 15-8 16-6 8-7 7-11 7-10 4-13 2h-11l-12-2-12-5-11-8-9-10-5-8-5-14-1-7-1-36 1-27 2-10 4-10 8-11 7-8 10-7 12-5z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        transform="translate(627,1149)"
        d="m0 0h21l15 5 11 7 11 11 7 11 4 10 2 13 1 22v23l-2 20-3 10-7 13-10 11-14 9-13 4-8 1h-11l-16-3-13-7-10-9-7-8-7-15-3-15v-56l3-15 8-16 11-12 11-8 14-5z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Logo;

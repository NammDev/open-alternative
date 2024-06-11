import {
  createTool,
  updateLOC,
  updateToolLicense,
  updateToolNoLicense,
} from "./tool";

const repositories = [
  //   {
  //     website: "https://openalternative.co/",
  //     github: "https://github.com/piotrkulpinski/openalternative",
  //     youtube: "",
  //   },
  //   {
  //     website: "https://oss.gallery/",
  //     github: "https://github.com/dubinc/oss-gallery",
  //     youtube: "",
  //   },
  //   {
  //     website: "https://shadverse.vercel.app/",
  //     github: "https://github.com/lucky-chap/shadverse",
  //     youtube: "",
  //   },
  //   {
  //     website: "https://maybe.co/",
  //     github: "https://github.com/maybe-finance/maybe-archive",
  //     youtube: "",
  //   },
  //   {
  //     website: "https://midday.ai/",
  //     github: "https://github.com/midday-ai/midday",
  //     youtube: "",
  //   },
  //   {
  //     website: "https://www.badget.io/",
  //     github: "https://github.com/projectx-codehagen/Badget",
  //     youtube: "",
  //   },
  //   {
  //     website: "https://expense.fyi/",
  //     github: "https://github.com/gokulkrishh/expense.fyi",
  //     youtube: "",
  //   },
  //   {
  //     website: "https://github.com/ridhwaans/homehost",
  //     github: "https://github.com/ridhwaans/homehost",
  //     youtube: "",
  //   },
  //   {
  //     website: "https://nextflix-blush.vercel.app/",
  //     github: "https://github.com/Apestein/nextflix",
  //     youtube: "",
  //   },
  //   {
  //     website: "https://netflx-web.vercel.app/",
  //     github: "https://github.com/sadmann7/netflx-web",
  //     youtube: "",
  //   },
  //   {
  //     website: "https://ani.rohi.dev/",
  //     github: "https://github.com/gneiru/anirohi",
  //     youtube: "",
  //   },
  //   {
  //     website: "https://www.stumpapp.dev/",
  //     github: "https://github.com/stumpapp/stump",
  //     youtube: "",
  //   },
  //   {
  //     website: "https://kompad.vercel.app/",
  //     github: "https://github.com/hudy9x/kompad",
  //     youtube: "",
  //   },
  //   {
  //     website: "https://www.namviek.com/",
  //     github: "https://github.com/hudy9x/namviek",
  //     youtube: "",
  //   },
  //   {
  //     website: "https://www.tsafi.xyz/",
  //     github: "https://github.com/michaelshimeles/tsafi",
  //     youtube: "",
  //   },
  //   {
  //     website: "https://podcastr-23zf.vercel.app/",
  //     github: "https://github.com/adrianhajdin/podcastr",
  //     youtube: "https://www.youtube.com/watch?v=zfAb95tJvZQ",
  //   },
  //   {
  //     website: "https://github.com/webprodigies/corinna-ai",
  //     github: "https://github.com/webprodigies/corinna-ai",
  //     youtube: "https://www.youtube.com/watch?v=9pCsyBlpmrc",
  //   },
  //   {
  //     website: "https://github.com/webdevcody/bid-buddy",
  //     github: "https://github.com/webdevcody/bid-buddy",
  //     youtube: "https://www.youtube.com/watch?v=xF2WvGuI5Ww",
  //   },
  //   {
  //     website: "https://lingo-clone.vercel.app/",
  //     github: "https://github.com/sanidhyy/duolingo-clone",
  //     youtube: "https://www.youtube.com/watch?v=dP75Khfy4s4",
  //   },
  //   {
  //     website: "https://quizmify.vercel.app/",
  //     github: "https://github.com/Elliott-Chong/quizmify",
  //     youtube: "",
  //   },
  //   {
  //     website: "https://quizzzy-brown.vercel.app/",
  //     github: "https://github.com/adam-ridhwan/quizzzy",
  //     youtube: "",
  //   },
  //   {
  //     website: "https://penx.io/",
  //     github: "https://github.com/penxio/penx",
  //     youtube: "",
  //   },
  //   {
  //     website: "https://github.com/webprodigies/webprodigies-cypress",
  //     github: "https://github.com/webprodigies/webprodigies-cypress",
  //     youtube: "https://www.youtube.com/watch?v=A3l6YYkXzzg&t=7s",
  //   },
  //   {
  //     website: "https://scribbly.subhambharadwaz.in/",
  //     github: "https://github.com/subhamBharadwaz/scribbly",
  //     youtube: "",
  //   },
  { website: "", github: "", youtube: "" },
  //   { website: "", github: "", youtube: "" },
];

async function main() {
  //   Promise.all(repositories.map(createTool));
  //   Promise.all(repositories.map(updateToolLicense));
  //   Promise.all(repositories.map(updateToolNoLicense));
  //   Promise.all(repositories.map(updateLOC));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {});

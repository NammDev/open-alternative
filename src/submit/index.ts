import {
  createTool,
  updateLOC,
  updateToolLicense,
  updateToolNoLicense,
} from "./tool";

const repositories = [
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
  // {
  //   website: "https://iotawise.rdev.pro/",
  //   github: "https://github.com/redpangilinan/iotawise",
  //   youtube: "",
  // },
  // {
  //   website: "https://demo.nextcrm.io/en/sign-in",
  //   github: "https://github.com/pdovhomilja/nextcrm-app",
  //   youtube: "",
  // },
  // {
  //   name: "Cal",
  //   website: "https://cal.com/",
  //   github: "https://github.com/calcom/cal.com",
  //   youtube: "",
  // },
  // {
  //   website: "https://infisical.com/",
  //   github: "https://github.com/Infisical/infisical",
  //   youtube: "",
  // },
  // {
  //   website: "https://uninbox.com/",
  //   github: "https://github.com/un/inbox",
  //   youtube: "",
  // },
  // {
  //   website: "https://www.getinboxzero.com/",
  //   github: "https://github.com/elie222/inbox-zero",
  //   youtube: "",
  // },
  // {
  //   website: "https://formbricks.com/",
  //   github: "https://github.com/formbricks/formbricks",
  //   youtube: "",
  // },
  // {
  //   website: "https://plane.so/",
  //   github: "https://github.com/makeplane/plane",
  //   youtube: "",
  // },
  // {
  //   website: "https://app.daily.dev/onboarding",
  //   github: "https://github.com/dailydotdev/apps",
  //   youtube: "",
  // },
  // {
  //   website: "https://www.papermark.io/",
  //   github: "https://github.com/mfts/papermark",
  //   youtube: "",
  // },
  // {
  //   website: "https://linkwarden.app/",
  //   github: "https://github.com/linkwarden/linkwarden",
  //   youtube: "",
  // },
  // {
  //   website: "https://documenso.com/",
  //   github: "https://github.com/documenso/documenso",
  //   youtube: "",
  // },
  // {
  //   website: "https://courselit.app/",
  //   github: "https://github.com/codelitdev/courselit",
  //   youtube: "",
  // },
  // {
  //   website: "https://www.openstatus.dev/",
  //   github: "https://github.com/openstatushq/openstatus",
  //   youtube: "",
  // },
  // {
  //   website: "https://twenty.com/",
  //   github: "https://github.com/twentyhq/twenty",
  //   youtube: "",
  // },
  // {
  //   website: "https://tianji.msgbyte.com/",
  //   github: "https://github.com/msgbyte/tianji",
  //   youtube: "",
  // },
  // {
  //   website: "https://formslab.vercel.app/",
  //   github: "https://github.com/Ryczko/FormsLab",
  //   youtube: "",
  // },
  // {
  //   website: "https://slug.vercel.app/",
  //   github: "https://github.com/pheralb/slug",
  //   youtube: "",
  // },
  // {
  //   website: "https://reduced.to/",
  //   github: "https://github.com/origranot/reduced.to",
  //   youtube: "",
  // },
  // {
  //   website: "https://hoarder.app/",
  //   github: "https://github.com/hoarder-app/hoarder",
  //   youtube: "",
  // },
  // {
  //   website: "https://xlog.app/",
  //   github: "https://github.com/Crossbell-Box/xLog",
  //   youtube: "",
  // },
  // {
  //   website: "https://gitroom.com/",
  //   github: "https://github.com/gitroomhq/gitroom",
  //   youtube: "",
  // },
  // {
  //   website: "https://www.smartexcel.cc/",
  //   github: "https://github.com/weijunext/smart-excel-ai",
  //   youtube: "",
  // },
  // {
  //   website: "https://dittofeed.com/",
  //   github: "https://github.com/dittofeed/dittofeed",
  //   youtube: "",
  // },
  // {
  //   website: "https://typehero.dev/",
  //   github: "https://github.com/typehero/typehero",
  //   youtube: "",
  // },
  // {
  //   website: "https://zipline.diced.sh/",
  //   github: "https://github.com/diced/zipline",
  //   youtube: "",
  // },
  // {
  //   website: "https://email.maocanhua.cn",
  //   github: "https://github.com/zalify/easy-email-editor",
  //   youtube: "",
  // },
  // {
  //   website: "https://next.medusajs.com/us",
  //   github: "https://github.com/medusajs/nextjs-starter-medusa",
  //   youtube: "",
  // },
  // {
  //   website: "https://payloadcms.com/",
  //   github: "https://github.com/joschan21/digitalhippo",
  //   youtube: "https://www.youtube.com/watch?v=06g6YJ6JCJU",
  // },
  // {
  //   website: "https://github.com/joschan21/magicsearch",
  //   github: "https://github.com/joschan21/magicsearch",
  //   youtube: "https://www.youtube.com/watch?v=_cqFkK3WLvg",
  // },
  // {
  //   website: "https://github.com/joschan21/filtering-system",
  //   github: "https://github.com/joschan21/filtering-system",
  //   youtube: "https://www.youtube.com/watch?v=_017xTgnqGw",
  // },
  // {
  //   website: "https://civitai.com/",
  //   github: "https://github.com/civitai/civitai",
  //   youtube: "",
  // },
  // {
  //   website: "https://onestopshop.jackblatch.com/",
  //   github: "https://github.com/jackblatch/OneStopShop",
  //   youtube: "",
  // },
  // {
  //   website: "https://evershop.io/",
  //   github: "https://github.com/evershopcommerce/evershop",
  //   youtube: "",
  // },
  // {
  //   website: "https://demo.vercel.store/",
  //   github: "https://github.com/vercel/commerce",
  //   youtube: "",
  // },
  // {
  //   website: "https://flair.vercel.app/",
  //   github: "https://github.com/adam-ridhwan/flair",
  //   youtube: "",
  // },
  // {
  //   website: "https://commerce.blazity.com/",
  //   github: "https://github.com/Blazity/enterprise-commerce",
  //   youtube: "",
  // },
  // {
  //   website: "http://shop.huanghanlian.com/",
  //   github: "https://github.com/huanghanzhilian/c-shopping",
  //   youtube: "",
  // },
  // {
  //   website: "https://github.com/webprodigies/fuzzie-production",
  //   github: "https://github.com/webprodigies/fuzzie-production",
  //   youtube: "https://www.youtube.com/watch?v=XkOXNlHJP6M",
  // },
  // {
  //   website: "https://github.com/webprodigies/plura-production",
  //   github: "https://github.com/webprodigies/plura-production",
  //   youtube: "https://www.youtube.com/watch?v=6omuUOZcWL",
  // },
  // {
  //   website: "https://www.open-resume.com/",
  //   github: "https://github.com/xitanggg/open-resume",
  //   youtube: "",
  // },
  // {
  //   website: "https://rxresu.me/",
  //   github: "https://github.com/AmruthPillai/Reactive-Resume",
  //   youtube: "",
  // },
  // {
  //   website: "https://furniro-ecommerce-blue.vercel.app/",
  //   github: "https://github.com/PiusLucky/furniro-ecommerce",
  //   youtube: "https://www.youtube.com/watch?v=KifP9huzlD4",
  // },
  // {
  //   website: "https://chadnext.moinulmoin.com/en/",
  //   github: "https://github.com/moinulmoin/chadnext",
  //   youtube: "",
  // },
  // {
  //   website: "https://resumake.io/",
  //   github: "https://github.com/saadq/resumake.io",
  //   youtube: "",
  // },
  // {
  //   website: "https://shadcn-landing-page.vercel.app/",
  //   github: "https://github.com/leoMirandaa/shadcn-landing-page",
  //   youtube: "",
  // },
  // {
  //   website: "https://meteo-nix.vercel.app/",
  //   github: "https://github.com/DariusLukasukas/nextjs-weather-app",
  //   youtube: "",
  // },
  // {
  //   website: "https://www.ub.cafe/",
  //   github: "https://github.com/timtbdev/Next.js-Blog-App",
  //   youtube: "",
  // },
  // {
  //   website: "https://notion-avatar.vercel.app/",
  //   github: "https://github.com/Mayandev/notion-avatar",
  //   youtube: "",
  // },
  // {
  //   website: "https://next-saas-stripe-starter.vercel.app/",
  //   github: "https://github.com/mickasmt/next-saas-stripe-starter",
  //   youtube: "",
  // },
  // {
  //   website: "https://freelance.shellbear.me/",
  //   github: "https://github.com/shellbear/freelance",
  //   youtube: "",
  // },
  // {
  //   website: "https://openbio.app/",
  //   github: "https://github.com/vanxh/openbio",
  //   youtube: "",
  // },
  // {
  //   website: "https://ledgity.finance/",
  //   github: "https://github.com/LedgityLabs/LedgityYield",
  //   youtube: "",
  // },
  // {
  //   website: "https://rao.pics/",
  //   github: "https://github.com/meetqy/rao-pics",
  //   youtube: "",
  // },
  // {
  //   website: "https://startertab.com/landingpad",
  //   github: "https://github.com/allister-grange/startertab",
  //   youtube: "",
  // },
  // {
  //   website: "https://og.anuragroy.dev/",
  //   github: "https://github.com/anurag-roy/og.anuragroy.dev",
  //   youtube: "",
  // },
  // {
  //   website: "https://packagepeek.com/",
  //   github: "https://github.com/arthureberledev/packagepeek",
  //   youtube: "",
  // },
  // {
  //   website: "https://www.roomgpt.io/",
  //   github: "https://github.com/Nutlope/roomGPT",
  //   youtube: "",
  // },
  // {
  //   website: "https://www.explorecareers.io/",
  //   github: "https://github.com/Nutlope/explorecareers",
  //   youtube: "",
  // },
  // {
  //   website: "https://pixel-craft-ten.vercel.app/",
  //   github: "https://github.com/adam-ridhwan/pixel-craft",
  //   youtube: "",
  // },
  // {
  //   website: "https://llm.report/",
  //   github: "https://github.com/dillionverma/llm.report",
  //   youtube: "",
  // },
  // {
  //   website: "https://www.rapidpages.com/",
  //   github: "https://github.com/rapidpages/rapidpages",
  //   youtube: "",
  // },
  // {
  //   website: "https://www.riffusion.com/",
  //   github: "https://github.com/riffusion/riffusion-app",
  //   youtube: "",
  // },
  // {
  //   website: "https://photoshot.app/",
  //   github: "https://github.com/baptadn/photoshot",
  //   youtube: "",
  // },
  // {
  //   website: "https://emojis.sh/",
  //   github: "https://github.com/pondorasti/emojis",
  //   youtube: "",
  // },
  // {
  //   website: "https://david-goggins-ai-coach-yt.vercel.app/",
  //   github: "https://github.com/bhancockio/david-goggins-ai-coach-yt",
  //   youtube: "https://www.youtube.com/watch?v=b1S04PFjIOY",
  // },
  // {
  //   website: "https://www.restorephotos.io/",
  //   github: "https://github.com/Nutlope/restorePhotos",
  //   youtube: "",
  // },
  // {
  //   website: "https://www.twitterbio.io/",
  //   github: "https://github.com/Nutlope/twitterbio",
  //   youtube: "",
  // },
  // {
  //   website: "https://www.getheadshots.ai/",
  //   github: "https://github.com/astriaai/headshots-starter",
  //   youtube: "",
  // },
  // {
  //   website: "https://fullstackopen.com/en/",
  //   github: "https://github.com/fullstack-hy2020/fullstack-hy2020.github.io",
  //   youtube: "",
  // },
  // {
  //   website: "https://bmrk.cc/",
  //   github: "https://github.com/gokulkrishh/bmrk.cc",
  //   youtube: "",
  // },
  // {
  //   website: "https://github.com/joschan21/casecobra",
  //   github: "https://github.com/joschan21/casecobra",
  //   youtube: "https://www.youtube.com/watch?v=SG82Aqcaaa0",
  // },
  // {
  //   website: "https://subs.is/",
  //   github: "https://github.com/gokulkrishh/subs.is",
  //   youtube: "",
  // },
  // {
  //   name: "Portfolio Sidebar",
  //   website: "https://onur.dev/",
  //   github: "https://github.com/suyalcinkaya/onur.dev",
  //   youtube: "",
  // },
  // {
  //   website: "https://cv.jarocki.me/",
  //   github: "https://github.com/BartoszJarocki/cv",
  //   youtube: "",
  // },
  {
    website: "https://dub.co/",
    github: "https://github.com/dubinc/dub",
    youtube: "",
  },
  {
    website: "https://extrapolate.app/",
    github: "https://github.com/steven-tey/extrapolate",
    youtube: "",
  },
];

async function main() {
  // Promise.all(repositories.map(createTool));
  // Promise.all(repositories.map(updateToolLicense));
  // Promise.all(repositories.map(updateToolNoLicense));
  Promise.all(repositories.map(updateLOC));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {});

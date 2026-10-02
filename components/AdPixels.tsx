import Script from "next/script";

/*
 * Ad platform tags. Each one is off until its ID is set in Vercel, and all of
 * them stay off for visitors whose browser sends Global Privacy Control: under
 * California law an ad pixel counts as "sharing", and GPC is the opt-out we
 * honour automatically. Disclosed on /privacy; keep that page in step.
 */
const META = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GOOGLE_ADS = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const LINKEDIN = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;

const GPC = "navigator.globalPrivacyControl!==true";

export function AdPixels() {
  return (
    <>
      {META && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`if(${GPC}){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META}');fbq('track','PageView');}`}
        </Script>
      )}
      {GOOGLE_ADS && (
        <Script id="google-ads" strategy="afterInteractive">
          {`if(${GPC}){window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('config','${GOOGLE_ADS}',{allow_enhanced_conversions:true});}`}
        </Script>
      )}
      {LINKEDIN && (
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`if(${GPC}){window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];
window._linkedin_data_partner_ids.push('${LINKEDIN}');
(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}
var s=document.getElementsByTagName('script')[0];var b=document.createElement('script');
b.type='text/javascript';b.async=true;b.src='https://snap.licdn.com/li.lms-analytics/insight.min.js';
s.parentNode.insertBefore(b,s);})(window.lintrk);}`}
        </Script>
      )}
    </>
  );
}

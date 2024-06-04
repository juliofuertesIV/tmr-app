export const FB_PIXEL_ID = 'ThisIsATest' //process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export const pageview = () => {
    (window as any).fbq("track", "PageView");
};

export const event = (name: string, options = {}) => {
    (window as any).fbq("track", name, options);
};
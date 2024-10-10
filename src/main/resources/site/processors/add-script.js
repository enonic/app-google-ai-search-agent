const libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/thymeleaf'),
    util: require('/lib/util')
};

const view = resolve('add-script.html');
const triggerView = resolve('trigger.html');


exports.responseProcessor = function (req, res) {

    if (req.mode === 'live' || req.mode === 'preview') {

        const siteConfig = libs.portal.getSiteConfig();

        const params = {
            configID: siteConfig["configId"],
            triggerID: "__googlesearch-trigger",
            tokenServiceUrl: libs.portal.serviceUrl({service: 'token', type: 'absolute'}),
            styleSrc: libs.portal.assetUrl({path: "/css/googlesearch.css"})
        };

        const metadata = libs.thymeleaf.render(view, params);

        // Force arrays since single values will be return as string instead of array
        res.pageContributions.headEnd = libs.util.data.forceArray(res.pageContributions.headEnd);
        res.pageContributions.headEnd.push(metadata);

        const triggerParams = {
            imgSrc: getImageUrl(siteConfig),
            animation: siteConfig["cssAnimation"] !== false,
            tooltip: siteConfig["iconTooltip"],
            scale: siteConfig["iconScale"] || 'small',
            text: siteConfig["iconText"],
            triggerID: params.triggerID
        };
        const triggerHtml = libs.thymeleaf.render(triggerView, triggerParams);

        res.pageContributions.bodyEnd = libs.util.data.forceArray(res.pageContributions.bodyEnd);
        res.pageContributions.bodyEnd.push(triggerHtml);
    }

    // Add ?debug=true to URL to disable this script-filter.
    if (req.params && req.params.debug === 'true') {
        res.applyFilters = false;
    }

    return res;
};

function getImageUrl(siteConfig) {
    const imageContent = siteConfig["iconContent"];
    let imageUrl = null;
    if (imageContent) {
        imageUrl = libs.portal.attachmentUrl({id: imageContent, download: false});
    }
    if (!imageUrl) {
        imageUrl = libs.portal.assetUrl({path: "/img/stars.svg"})
    }
    return imageUrl;
}

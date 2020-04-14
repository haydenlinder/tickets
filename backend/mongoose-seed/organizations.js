const organizationSeeds = {
    model: 'Organization',
    documents: [
        {
            handle: "cats4humanity.org",
            name: "Cats for Humanity",
            motto: "a cat in every household!"
        },
        {
            handle: "acme.boom",
            name: "ACME",
            motto: "next time..."
        },
        // {
        //     handle: "gmail.com",
        //     name: "Google",
        //     motto: "if you have a gmail account, you work at Google!"
        // },
        {
            handle: "appacademy.io",
            name: "appAcademy",
            motto: "appAcademy: if you liked your old life, you wouldn't be here."
        },
    ]
};

module.exports = organizationSeeds;

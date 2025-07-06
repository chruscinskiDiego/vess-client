export interface IWelcomeTutorial {
    title: string;
    description: string | React.ReactNode;
    imageUrl?: string;
    videoUrl?: string;
};

export interface IAttributionsTutorial {
    title?: string;
    imageUrl?: string;
    subtitle?: string;
    description?: string | React.ReactNode;
};

export interface IComplementaryInfoTutorial {
    title?: string;
    score?: string;
    imageUrl?: string;
};

interface IManagementDecisionTutorialCard {
    type: 'green' | 'orange' | 'red';
    title?: string;
    text?: string;
};

export interface IManagementDecisionTutorial {
    introduction: string;
    decisionCards: IManagementDecisionTutorialCard[];
};

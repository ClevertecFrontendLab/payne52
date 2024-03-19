export const BadgeClasses = {
    Ноги: 'legs',
    Руки: 'hands',
    Силовая: 'strength',
    Спина: 'back',
    Грудь: 'chest',
};

export type BadgeType = keyof typeof BadgeClasses;

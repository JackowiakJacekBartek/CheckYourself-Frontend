export interface JobOfferApplies {
    account: Account;
    quiz: Quiz;
    quizAttempt: QuizAttempt;
}

interface Account {
    allowsNotifications: boolean;
    birthdate: Date | null;
    createdAt: Date;
    description: string;
    email: string;
    emailConfirmed: boolean;
    employmentMethod: number;
    employmentType: number;
    id: number;
    idRole: number;
    image: string | null;
    lastModificationDate: Date;
    location: string | null;
    name: string;
    phoneNumber: string | null;
    refreshToken: string;
    refreshTokenValid: Date | null;
    salaryMax: number | null;
    salaryMin: number | null;
    surname: string;
    title: string | null;
    verificationCode: number;
    verificationCodeValid: Date | null;
}

interface Quiz {
    description: string;
    id: number;
    idCompany: number;
    image: string | null;
    name: string;
    passingthreshold: number;
    technology: string;
    totalscore: number;
    totalTime: string;
    type: number;
}

interface QuizAttempt {
    id: number;
    idAccount: number;
    idQuiz: number;
    idQuizNavigation: Quiz | null;
    totalElapsedTime: string;
    totalparticipantscore: number;
}

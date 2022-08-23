export type Company = {
  id: string;
  name: string;
  hubspotLink?: string;
  notionLink?: string;
  feedbacks?: Feedback[];
  users?: User[];
  createdAt: Date;
  updatedAt: Date;
};

export type Feedback = {
  id: string;
  company: Company;
  companyId: string;
  title: string;
  description: string;
  attachmentLink?: string;
  isCritical: IsCritical;
  status: FeedbackStatus;
  feedbackType: FeedbackType;
  comments?: UserComment[];
  createdAt: Date;
  updatedAt: Date;
  closedAt?: Date;
};

export type UserComment = {
  id: string;
  feedback: Feedback;
  feedbackId: string;
  message?: string;
  author: User;
  authorId: string;
  attachmentLink?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: string;
  name: string;
  email?: string[];
  phone?: string[];
  userStatus: UserStatus;
  company: Company;
  companyId: string;
  comments?: UserComment[];
  hubspotLink?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type NavigationItem = {
  id: string;
  title: string;
  href: string;
  target?: string;
  rel?: string;
};

enum FeedbackStatus {
  OPEN = "OPEN",
  PENDING_RESOLUTION = "PENDING_RESOLUTION",
  CLOSED = "CLOSED",
}

enum FeedbackType {
  TBD = "TBD",
  DEFECT = "DEFECT",
  FEATURE = "FEATURE",
  USER_FAILURE = "USER_FAILURE",
}

enum IsCritical {
  TBD = "TBD",
  TRUE = "TRUE",
  FALSE = "FALSE",
}

enum UserStatus {
  SUPPORT = "SUPPORT",
  QARA = "QARA",
  PRODUCT = "PRODUCT",
  ADMIN = "ADMIN",
  END_USER = "END_USER",
}

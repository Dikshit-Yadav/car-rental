export const CAR_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  SUSPENDED: "SUSPENDED",
} as const;

export type CarStatus =
  (typeof CAR_STATUS)[keyof typeof CAR_STATUS];
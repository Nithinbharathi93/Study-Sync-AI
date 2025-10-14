-- CreateTable
CREATE TABLE "study_plans" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "topics" TEXT[],
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "study_plans_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "study_plans" ADD CONSTRAINT "study_plans_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

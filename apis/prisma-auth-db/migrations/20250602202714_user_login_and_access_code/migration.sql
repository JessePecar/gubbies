/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `User` table. All the data in the column will be lost.
  - Added the required column `accessCode` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Application] ADD [accessCode] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[User] DROP COLUMN [password],
[userName];

-- CreateTable
CREATE TABLE [dbo].[UserLogin] (
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [userId] INT NOT NULL,
    CONSTRAINT [UserLogin_username_key] UNIQUE NONCLUSTERED ([username]),
    CONSTRAINT [UserLogin_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[UserClaim] (
    [code] NVARCHAR(1000) NOT NULL,
    [userId] INT NOT NULL,
    [value] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [UserClaim_pkey] PRIMARY KEY CLUSTERED ([code],[userId])
);

-- CreateTable
CREATE TABLE [dbo].[PasswordChange] (
    [username] NVARCHAR(1000) NOT NULL,
    [token] NVARCHAR(1000) NOT NULL,
    [expiration] DATETIME2 NOT NULL,
    CONSTRAINT [PasswordChange_pkey] PRIMARY KEY CLUSTERED ([token])
);

-- AddForeignKey
ALTER TABLE [dbo].[UserLogin] ADD CONSTRAINT [UserLogin_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserClaim] ADD CONSTRAINT [UserClaim_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

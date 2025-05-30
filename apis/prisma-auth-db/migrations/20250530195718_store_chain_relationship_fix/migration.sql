/*
  Warnings:

  - You are about to drop the `_ChainToStore` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[_ChainToStore] DROP CONSTRAINT [_ChainToStore_A_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[_ChainToStore] DROP CONSTRAINT [_ChainToStore_B_fkey];

-- DropTable
DROP TABLE [dbo].[_ChainToStore];

-- AddForeignKey
ALTER TABLE [dbo].[Store] ADD CONSTRAINT [Store_chainId_fkey] FOREIGN KEY ([chainId]) REFERENCES [dbo].[Chain]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

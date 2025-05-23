BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Permissions] DROP CONSTRAINT [Permissions_permissionGroupId_fkey];

-- RedefineTables
BEGIN TRANSACTION;
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'PermissionGroup'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_PermissionGroup] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [PermissionGroup_pkey] PRIMARY KEY CLUSTERED ([id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_PermissionGroup] ON;
IF EXISTS(SELECT * FROM [dbo].[PermissionGroup])
    EXEC('INSERT INTO [dbo].[_prisma_new_PermissionGroup] ([id],[name]) SELECT [id],[name] FROM [dbo].[PermissionGroup] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_PermissionGroup] OFF;
DROP TABLE [dbo].[PermissionGroup];
EXEC SP_RENAME N'dbo._prisma_new_PermissionGroup', N'PermissionGroup';
COMMIT;

-- AddForeignKey
ALTER TABLE [dbo].[Permissions] ADD CONSTRAINT [Permissions_permissionGroupId_fkey] FOREIGN KEY ([permissionGroupId]) REFERENCES [dbo].[PermissionGroup]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

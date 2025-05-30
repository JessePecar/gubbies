BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Application] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [domain] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Application_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Chain] (
    [id] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [Chain_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Chain_id_key] UNIQUE NONCLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[StoreType] (
    [code] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [StoreType_pkey] PRIMARY KEY CLUSTERED ([code]),
    CONSTRAINT [StoreType_code_key] UNIQUE NONCLUSTERED ([code])
);

-- CreateTable
CREATE TABLE [dbo].[Store] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [typeCode] NVARCHAR(1000) NOT NULL,
    [isDeleted] BIT NOT NULL,
    [isActive] BIT NOT NULL,
    [phoneId] INT NOT NULL,
    [addressId] INT NOT NULL,
    [chainId] INT NOT NULL,
    CONSTRAINT [Store_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Store_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [Store_phoneId_key] UNIQUE NONCLUSTERED ([phoneId]),
    CONSTRAINT [Store_addressId_key] UNIQUE NONCLUSTERED ([addressId])
);

-- CreateTable
CREATE TABLE [dbo].[Department] (
    [code] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [phoneId] INT NOT NULL,
    CONSTRAINT [Department_pkey] PRIMARY KEY CLUSTERED ([code]),
    CONSTRAINT [Department_phoneId_key] UNIQUE NONCLUSTERED ([phoneId])
);

-- CreateTable
CREATE TABLE [dbo].[StoreDepartment] (
    [departmentCode] NVARCHAR(1000) NOT NULL,
    [storeId] INT NOT NULL,
    CONSTRAINT [StoreDepartment_pkey] PRIMARY KEY CLUSTERED ([departmentCode],[storeId])
);

-- CreateTable
CREATE TABLE [dbo].[Phone] (
    [id] INT NOT NULL IDENTITY(1,1),
    [rawDigits] NVARCHAR(1000) NOT NULL,
    [nationalDigits] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Phone_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Address] (
    [id] INT NOT NULL IDENTITY(1,1),
    [address1] NVARCHAR(1000) NOT NULL,
    [address2] NVARCHAR(1000),
    [state] NVARCHAR(1000) NOT NULL,
    [city] NVARCHAR(1000) NOT NULL,
    [countryCode] NVARCHAR(1000) NOT NULL,
    [postalCode] INT NOT NULL,
    CONSTRAINT [Address_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Address_id_key] UNIQUE NONCLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [firstName] NVARCHAR(1000),
    [lastName] NVARCHAR(1000),
    [roleId] INT NOT NULL,
    [primaryPhoneId] INT,
    [addressId] INT,
    [userName] NVARCHAR(1000),
    [password] NVARCHAR(1000),
    [isActive] BIT NOT NULL CONSTRAINT [User_isActive_df] DEFAULT 1,
    [emailAddress] NVARCHAR(1000),
    [applicationId] INT NOT NULL CONSTRAINT [User_applicationId_df] DEFAULT 0,
    [isEnterpriseMode] BIT NOT NULL CONSTRAINT [User_isEnterpriseMode_df] DEFAULT 0,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_primaryPhoneId_key] UNIQUE NONCLUSTERED ([primaryPhoneId]),
    CONSTRAINT [User_addressId_key] UNIQUE NONCLUSTERED ([addressId])
);

-- CreateTable
CREATE TABLE [dbo].[Permission] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [permissionGroupId] INT,
    CONSTRAINT [Permission_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PermissionGroup] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [PermissionGroup_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Role] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [hierarchyTier] INT NOT NULL CONSTRAINT [Role_hierarchyTier_df] DEFAULT 1,
    CONSTRAINT [Role_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[RolePermission] (
    [roleId] INT NOT NULL,
    [permissionId] INT NOT NULL,
    CONSTRAINT [RolePermission_pkey] PRIMARY KEY CLUSTERED ([roleId],[permissionId])
);

-- CreateTable
CREATE TABLE [dbo].[_ChainToStore] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_ChainToStore_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_ChainToStore_B_index] ON [dbo].[_ChainToStore]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[Store] ADD CONSTRAINT [Store_addressId_fkey] FOREIGN KEY ([addressId]) REFERENCES [dbo].[Address]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Store] ADD CONSTRAINT [Store_phoneId_fkey] FOREIGN KEY ([phoneId]) REFERENCES [dbo].[Phone]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Store] ADD CONSTRAINT [Store_typeCode_fkey] FOREIGN KEY ([typeCode]) REFERENCES [dbo].[StoreType]([code]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Department] ADD CONSTRAINT [Department_phoneId_fkey] FOREIGN KEY ([phoneId]) REFERENCES [dbo].[Phone]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[StoreDepartment] ADD CONSTRAINT [StoreDepartment_departmentCode_fkey] FOREIGN KEY ([departmentCode]) REFERENCES [dbo].[Department]([code]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[StoreDepartment] ADD CONSTRAINT [StoreDepartment_storeId_fkey] FOREIGN KEY ([storeId]) REFERENCES [dbo].[Store]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[Role]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_primaryPhoneId_fkey] FOREIGN KEY ([primaryPhoneId]) REFERENCES [dbo].[Phone]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_addressId_fkey] FOREIGN KEY ([addressId]) REFERENCES [dbo].[Address]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_applicationId_fkey] FOREIGN KEY ([applicationId]) REFERENCES [dbo].[Application]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Permission] ADD CONSTRAINT [Permission_permissionGroupId_fkey] FOREIGN KEY ([permissionGroupId]) REFERENCES [dbo].[PermissionGroup]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RolePermission] ADD CONSTRAINT [RolePermission_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[Role]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RolePermission] ADD CONSTRAINT [RolePermission_permissionId_fkey] FOREIGN KEY ([permissionId]) REFERENCES [dbo].[Permission]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_ChainToStore] ADD CONSTRAINT [_ChainToStore_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[Chain]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_ChainToStore] ADD CONSTRAINT [_ChainToStore_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[Store]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

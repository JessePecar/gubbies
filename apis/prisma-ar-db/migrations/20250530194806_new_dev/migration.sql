BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[AdjustmentRuleModel] (
    [id] INT NOT NULL,
    [modelName] NVARCHAR(1000) NOT NULL,
    [parentModelId] INT NOT NULL,
    CONSTRAINT [AdjustmentRuleModel_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Comparitor] (
    [code] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Comparitor_pkey] PRIMARY KEY CLUSTERED ([code])
);

-- CreateTable
CREATE TABLE [dbo].[AdjustmentSetting] (
    [id] INT NOT NULL IDENTITY(1,1),
    [chainId] INT NOT NULL,
    [comparitorCode] NVARCHAR(1000) NOT NULL,
    [value] NVARCHAR(1000) NOT NULL,
    [reasonId] INT NOT NULL,
    CONSTRAINT [AdjustmentSetting_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[AdjustmentReason] (
    [id] INT NOT NULL IDENTITY(1,1),
    [chainId] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [AdjustmentReason_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [AdjustmentReason_id_key] UNIQUE NONCLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ItemAdjustmentReason] (
    [reasonId] INT NOT NULL,
    [itemId] INT NOT NULL,
    CONSTRAINT [ItemAdjustmentReason_pkey] PRIMARY KEY CLUSTERED ([reasonId],[itemId])
);

-- AddForeignKey
ALTER TABLE [dbo].[AdjustmentRuleModel] ADD CONSTRAINT [AdjustmentRuleModel_parentModelId_fkey] FOREIGN KEY ([parentModelId]) REFERENCES [dbo].[AdjustmentRuleModel]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[AdjustmentSetting] ADD CONSTRAINT [AdjustmentSetting_reasonId_fkey] FOREIGN KEY ([reasonId]) REFERENCES [dbo].[AdjustmentReason]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[AdjustmentSetting] ADD CONSTRAINT [AdjustmentSetting_comparitorCode_fkey] FOREIGN KEY ([comparitorCode]) REFERENCES [dbo].[Comparitor]([code]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[AdjustmentItems] (
    [adjustmentId] INT NOT NULL,
    [itemId] INT NOT NULL,
    CONSTRAINT [AdjustmentItems_pkey] PRIMARY KEY CLUSTERED ([adjustmentId],[itemId])
);

-- CreateTable
CREATE TABLE [dbo].[Adjustments] (
    [id] INT NOT NULL IDENTITY(1,1),
    [createDate] DATETIME2,
    [status] INT NOT NULL,
    [completeDate] DATETIME2,
    CONSTRAINT [Adjustments_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Categories] (
    [code] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000),
    [canPromote] BIT NOT NULL CONSTRAINT [Categories_canPromote_df] DEFAULT 0,
    [canTransfer] BIT NOT NULL CONSTRAINT [Categories_canTransfer_df] DEFAULT 1,
    CONSTRAINT [Categories_pkey] PRIMARY KEY CLUSTERED ([code])
);

-- CreateTable
CREATE TABLE [dbo].[Subcategory] (
    [code] NVARCHAR(1000) NOT NULL,
    [categoryCode] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000),
    [canPromote] BIT NOT NULL CONSTRAINT [Subcategory_canPromote_df] DEFAULT 0,
    [canTransfer] BIT NOT NULL CONSTRAINT [Subcategory_canTransfer_df] DEFAULT 1,
    CONSTRAINT [Subcategory_pkey] PRIMARY KEY CLUSTERED ([code])
);

-- CreateTable
CREATE TABLE [dbo].[Family] (
    [code] NVARCHAR(1000) NOT NULL,
    [subcategoryCode] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000),
    [locationId] INT,
    [canPromote] BIT NOT NULL CONSTRAINT [Family_canPromote_df] DEFAULT 0,
    [canTransfer] BIT NOT NULL CONSTRAINT [Family_canTransfer_df] DEFAULT 1,
    [canPriceChange] BIT NOT NULL CONSTRAINT [Family_canPriceChange_df] DEFAULT 1,
    CONSTRAINT [Family_pkey] PRIMARY KEY CLUSTERED ([code])
);

-- CreateTable
CREATE TABLE [dbo].[ShelfLocation] (
    [id] INT NOT NULL IDENTITY(1,1),
    [aisle] INT NOT NULL,
    [side] NVARCHAR(1000) NOT NULL,
    [section] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [ShelfLocation_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Vendor] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [note] NVARCHAR(1000) NOT NULL,
    [primaryPhoneId] INT,
    [secondaryPhoneId] INT,
    [addressId] INT,
    CONSTRAINT [Vendor_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ItemVendor] (
    [itemId] INT NOT NULL,
    [vendorId] INT NOT NULL,
    [vendorItemId] NVARCHAR(1000) NOT NULL,
    [cost] DECIMAL(32,16) NOT NULL,
    [canReturn] BIT NOT NULL CONSTRAINT [ItemVendor_canReturn_df] DEFAULT 1,
    [isAutoReplenish] BIT NOT NULL CONSTRAINT [ItemVendor_isAutoReplenish_df] DEFAULT 1,
    [isPreferredVendor] BIT NOT NULL CONSTRAINT [ItemVendor_isPreferredVendor_df] DEFAULT 0,
    [canPromote] BIT NOT NULL CONSTRAINT [ItemVendor_canPromote_df] DEFAULT 0,
    [reorderQuantity] DECIMAL(32,16) NOT NULL CONSTRAINT [ItemVendor_reorderQuantity_df] DEFAULT 0,
    CONSTRAINT [ItemVendor_pkey] PRIMARY KEY CLUSTERED ([vendorId],[itemId])
);

-- CreateTable
CREATE TABLE [dbo].[Items] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [categoryCode] NVARCHAR(1000) NOT NULL,
    [subcategoryCode] NVARCHAR(1000),
    [fieldCode] NVARCHAR(1000),
    [quantityOnHand] NVARCHAR(1000) NOT NULL,
    [isHazardous] BIT NOT NULL,
    [isActive] BIT NOT NULL,
    [retirementStatus] INT NOT NULL,
    [reorderQuantity] DECIMAL(32,16) NOT NULL,
    [unitOfMeasurementType] INT NOT NULL,
    [vendorId] INT NOT NULL,
    CONSTRAINT [Items_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PriceType] (
    [id] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [PriceType_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Price] (
    [id] INT NOT NULL IDENTITY(1,1),
    [itemId] INT NOT NULL,
    [price] DECIMAL(32,16) NOT NULL,
    [priceTypeId] INT NOT NULL,
    [isTimedOverride] BIT,
    [expirationDate] DATETIME2,
    [isQuantityOverride] BIT,
    [expirationQuantity] INT NOT NULL,
    CONSTRAINT [Price_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[SequelizeMeta] (
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [SequelizeMeta_pkey] PRIMARY KEY CLUSTERED ([name])
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

-- AddForeignKey
ALTER TABLE [dbo].[AdjustmentItems] ADD CONSTRAINT [AdjustmentItems_adjustmentId_fkey] FOREIGN KEY ([adjustmentId]) REFERENCES [dbo].[Adjustments]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[AdjustmentItems] ADD CONSTRAINT [AdjustmentItems_itemId_fkey] FOREIGN KEY ([itemId]) REFERENCES [dbo].[Items]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Subcategory] ADD CONSTRAINT [Subcategory_categoryCode_fkey] FOREIGN KEY ([categoryCode]) REFERENCES [dbo].[Categories]([code]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Family] ADD CONSTRAINT [Family_subcategoryCode_fkey] FOREIGN KEY ([subcategoryCode]) REFERENCES [dbo].[Subcategory]([code]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Family] ADD CONSTRAINT [Family_locationId_fkey] FOREIGN KEY ([locationId]) REFERENCES [dbo].[ShelfLocation]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Vendor] ADD CONSTRAINT [Vendor_primaryPhoneId_fkey] FOREIGN KEY ([primaryPhoneId]) REFERENCES [dbo].[Phone]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Vendor] ADD CONSTRAINT [Vendor_secondaryPhoneId_fkey] FOREIGN KEY ([secondaryPhoneId]) REFERENCES [dbo].[Phone]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Vendor] ADD CONSTRAINT [Vendor_addressId_fkey] FOREIGN KEY ([addressId]) REFERENCES [dbo].[Address]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ItemVendor] ADD CONSTRAINT [ItemVendor_itemId_fkey] FOREIGN KEY ([itemId]) REFERENCES [dbo].[Items]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ItemVendor] ADD CONSTRAINT [ItemVendor_vendorId_fkey] FOREIGN KEY ([vendorId]) REFERENCES [dbo].[Vendor]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Items] ADD CONSTRAINT [Items_categoryCode_fkey] FOREIGN KEY ([categoryCode]) REFERENCES [dbo].[Categories]([code]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Items] ADD CONSTRAINT [Items_subcategoryCode_fkey] FOREIGN KEY ([subcategoryCode]) REFERENCES [dbo].[Subcategory]([code]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Items] ADD CONSTRAINT [Items_fieldCode_fkey] FOREIGN KEY ([fieldCode]) REFERENCES [dbo].[Family]([code]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Price] ADD CONSTRAINT [Price_itemId_fkey] FOREIGN KEY ([itemId]) REFERENCES [dbo].[Items]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Price] ADD CONSTRAINT [Price_priceTypeId_fkey] FOREIGN KEY ([priceTypeId]) REFERENCES [dbo].[PriceType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

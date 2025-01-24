-- CreateTable
CREATE TABLE "customers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "deleted_at" DATETIME,
    "deleted" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customer_id" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "account_balance" DECIMAL NOT NULL,
    "account_type" TEXT DEFAULT 'savings',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "deleted_at" DATETIME,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "accounts_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers" ("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "source_account_number" TEXT NOT NULL,
    "destination_account_number" TEXT NOT NULL,
    "transaction_type" TEXT DEFAULT 'credit',
    "amount" DECIMAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "deleted_at" DATETIME,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "transactions_source_account_number_fkey" FOREIGN KEY ("source_account_number") REFERENCES "accounts" ("account_number") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "transactions_destination_account_number_fkey" FOREIGN KEY ("destination_account_number") REFERENCES "accounts" ("account_number") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_id_key" ON "customers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_customer_id_key" ON "customers"("customer_id");

-- CreateIndex
CREATE INDEX "customers_customer_id_idx" ON "customers"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_id_key" ON "accounts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_account_number_key" ON "accounts"("account_number");

-- CreateIndex
CREATE INDEX "accounts_customer_id_idx" ON "accounts"("customer_id");

-- CreateIndex
CREATE INDEX "accounts_account_number_idx" ON "accounts"("account_number");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_id_key" ON "transactions"("id");

-- CreateIndex
CREATE INDEX "transactions_source_account_number_created_at_idx" ON "transactions"("source_account_number", "created_at");

-- CreateIndex
CREATE INDEX "transactions_destination_account_number_created_at_idx" ON "transactions"("destination_account_number", "created_at");

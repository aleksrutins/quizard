CREATE TABLE `sets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`creator` text,
	`description` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `terms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`set_id` integer,
	`term_type` text,
	`term` text,
	`definition_type` text,
	`definition` text,
	FOREIGN KEY (`set_id`) REFERENCES `sets`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `sets` (`name`);--> statement-breakpoint
CREATE INDEX `description_idx` ON `sets` (`description`);--> statement-breakpoint
CREATE INDEX `creator_idx` ON `sets` (`creator`);
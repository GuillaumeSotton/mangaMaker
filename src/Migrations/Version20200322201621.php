<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200322201621 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE manga ADD universe_id INT NOT NULL, ADD genre_id INT NOT NULL');
        $this->addSql('ALTER TABLE manga ADD CONSTRAINT FK_765A9E035CD9AF2 FOREIGN KEY (universe_id) REFERENCES universes (id)');
        $this->addSql('ALTER TABLE manga ADD CONSTRAINT FK_765A9E034296D31F FOREIGN KEY (genre_id) REFERENCES genres (id)');
        $this->addSql('CREATE INDEX IDX_765A9E035CD9AF2 ON manga (universe_id)');
        $this->addSql('CREATE INDEX IDX_765A9E034296D31F ON manga (genre_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE manga DROP FOREIGN KEY FK_765A9E035CD9AF2');
        $this->addSql('ALTER TABLE manga DROP FOREIGN KEY FK_765A9E034296D31F');
        $this->addSql('DROP INDEX IDX_765A9E035CD9AF2 ON manga');
        $this->addSql('DROP INDEX IDX_765A9E034296D31F ON manga');
        $this->addSql('ALTER TABLE manga DROP universe_id, DROP genre_id');
    }
}

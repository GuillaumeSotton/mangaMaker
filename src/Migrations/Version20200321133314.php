<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200321133314 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE characters DROP FOREIGN KEY FK_937AB0345CD9AF2');
        $this->addSql('DROP INDEX idx_937ab0345cd9af2 ON characters');
        $this->addSql('CREATE INDEX IDX_3A29410E5CD9AF2 ON characters (universe_id)');
        $this->addSql('ALTER TABLE characters ADD CONSTRAINT FK_937AB0345CD9AF2 FOREIGN KEY (universe_id) REFERENCES universes (id)');
        $this->addSql('ALTER TABLE submit_ressources ADD genre_id INT NOT NULL, ADD universe_id INT DEFAULT NULL, ADD perso_id INT DEFAULT NULL, ADD type VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE submit_ressources ADD CONSTRAINT FK_46ABFF2B4296D31F FOREIGN KEY (genre_id) REFERENCES genres (id)');
        $this->addSql('ALTER TABLE submit_ressources ADD CONSTRAINT FK_46ABFF2B5CD9AF2 FOREIGN KEY (universe_id) REFERENCES universes (id)');
        $this->addSql('ALTER TABLE submit_ressources ADD CONSTRAINT FK_46ABFF2B1221E019 FOREIGN KEY (perso_id) REFERENCES characters (id)');
        $this->addSql('CREATE INDEX IDX_46ABFF2B4296D31F ON submit_ressources (genre_id)');
        $this->addSql('CREATE INDEX IDX_46ABFF2B5CD9AF2 ON submit_ressources (universe_id)');
        $this->addSql('CREATE INDEX IDX_46ABFF2B1221E019 ON submit_ressources (perso_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE characters DROP FOREIGN KEY FK_3A29410E5CD9AF2');
        $this->addSql('DROP INDEX idx_3a29410e5cd9af2 ON characters');
        $this->addSql('CREATE INDEX IDX_937AB0345CD9AF2 ON characters (universe_id)');
        $this->addSql('ALTER TABLE characters ADD CONSTRAINT FK_3A29410E5CD9AF2 FOREIGN KEY (universe_id) REFERENCES universes (id)');
        $this->addSql('ALTER TABLE submit_ressources DROP FOREIGN KEY FK_46ABFF2B4296D31F');
        $this->addSql('ALTER TABLE submit_ressources DROP FOREIGN KEY FK_46ABFF2B5CD9AF2');
        $this->addSql('ALTER TABLE submit_ressources DROP FOREIGN KEY FK_46ABFF2B1221E019');
        $this->addSql('DROP INDEX IDX_46ABFF2B4296D31F ON submit_ressources');
        $this->addSql('DROP INDEX IDX_46ABFF2B5CD9AF2 ON submit_ressources');
        $this->addSql('DROP INDEX IDX_46ABFF2B1221E019 ON submit_ressources');
        $this->addSql('ALTER TABLE submit_ressources DROP genre_id, DROP universe_id, DROP perso_id, DROP type');
    }
}

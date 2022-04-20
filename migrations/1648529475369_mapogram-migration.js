/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('map_types', {
        id: 'id',
        name: {type: 'varchar(100)', notNull: true},
        layout: {type: 'varchar(100)', notNull: true},
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updatedAt: {
            type: 'timestamp',
            default: pgm.func('current_timestamp')
        }
    });

    pgm.createTable('maps', {
        id: 'id',
        caption: { type: 'varchar(1000)', notNull: true },
        outputPath: { type: 'varchar(1000)', notNull: true },
        zoomLevel: { type: 'varchar(50)', notNull: true },
        command: { type: 'varchar(2000)', notNull: true },
        typeId: {
            type: 'integer',
            notNull: true,
            references: 'map_types',
            onDelete: 'cascade',
        },
        layout: {type: 'varchar(100)'},
        lat: {type: 'varchar(50)'},
        long: {type: 'varchar(50)'},
        startDate: {type: 'date', notNull: true},
        endDate: {type: 'date'},
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updatedAt: {
            type: 'timestamp',
            default: pgm.func('current_timestamp')
        }
    })
};

exports.down = pgm => {
    pgm.dropTable('map_types', {
        ifExists: true,
        cascade: true,
    })

    pgm.dropTable('maps', {
        ifExists: true,
        cascade: true
    })
};

import TestWidget from "./TestWidget";
import MrTreeWidget from "@/MrTreeWidget";

test('the node duplication is auto-selected on this this node select', cb => {
    TestWidget.init({
        globalOptions: {
            data: [
                {
                    id: '1_hash1',
                    parent: '#',
                    text: 'Item 1 with hash1',
                },
                {
                    id: '1_hash2',
                    parent: '#',
                    text: 'Item 2 with hash2'
                },
            ],
            idSeparator: '_',
        },
        callback: (instance: MrTreeWidget) => {
            instance.getJstree().select_node('1_hash1');
            const selectedNodes = instance.getJstree().get_selected();
            expect(selectedNodes).toEqual(['1_hash1', '1_hash2']);
            cb();
        }
    });
});

test('the node duplication is auto-deselected on this this node deselect', cb => {
    TestWidget.init({
        globalOptions: {
            data: [
                {
                    id: '1_hash1',
                    parent: '#',
                    text: 'Item 1 with hash1',
                    state: {selected: true},
                },
                {
                    id: '1_hash2',
                    parent: '#',
                    text: 'Item 2 with hash2',
                    state: {selected: true},
                },
            ],
            idSeparator: '_',
        },
        callback: (instance: MrTreeWidget) => {
            instance.getJstree().deselect_node('1_hash1');
            const selectedNodes = instance.getJstree().get_selected();
            expect(selectedNodes).toEqual([]);
            cb();
        }
    });
});

test('a node duplicate is defined by a full app id', cb => {
    TestWidget.init({
        globalOptions: {
            data: [
                {
                    id: '1_hash1',
                    parent: '#',
                    text: 'Item 1 with hash1',
                },
                {
                    id: '1_hash2',
                    parent: '#',
                    text: 'Item 2 with hash2',
                },
                {
                    id: '11_hash1',
                    parent: '#',
                    text: 'Item 11 with hash1',
                },
            ],
            idSeparator: '_',
        },
        callback: (instance: MrTreeWidget) => {
            instance.getJstree().select_node('1_hash1');
            const selectedNodes = instance.getJstree().get_selected();
            expect(selectedNodes).toEqual(['1_hash1', '1_hash2',]);
            cb();
        }
    });
});
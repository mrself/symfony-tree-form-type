import Options from './Options';

export default class MrTreeWidget {
    protected options: Options;

    protected $el: JQuery;

    protected static instances: Array<MrTreeWidget>;

    protected static getDefaults() {
        return {
            name: 'mrTreeWidget',
            data: {}
        };
    }

    static init(options: Options) {
        const instance = new MrTreeWidget();
        instance.init(options);
        return instance;
    }

    init(options: Options) {
        const defaults = MrTreeWidget.getDefaults();
        this.options = {...defaults, ...options};
        this.$el = $(options.el);
        this.$el.jstree(this.getJsTreeOptions());
    }

    getJsTreeOptions() {
        const self = this;

        return {
            core: {
                data: this.options.data
            },
            sort: function (a: string, b: string) {
                return self.sort(this.get_node(a), this.get_node(b));
            }
        }
    }

    sort(a: any, b: any) {
        if (a.original.weight && b.original.weight) {
            return this.compareByWeight(a, b);
        }

        return this.compareAlphabetically(a, b);
    }

    compareByWeight(a: any, b: any) {
        if (a.original.weight > b.original.weight) {
            return 1;
        } else if (a.original.weight < b.original.weight) {
            return -1;
        }
        return 0;
    }

    compareAlphabetically(a: any, b: any) {
        const text1 = a.original.text;
        const text2 = b.original.text;

        if (isNaN(+text1) || isNaN(+text2)) {
            return text1 < text2 ? -1 : 1;
        }

        return +text1 < +text2 ? -1 : 1;
    }

    static initByEl(el: HTMLElement) {
        return this.init({
            el: el
        });
    }

    static boot() {
        const name = this.getDefaults().name;
        this.instances = $(`.${name}`)
            .map((index: number, el: HTMLElement): MrTreeWidget => {
                return this.initByEl(el);
            })
            .get();
    }
}
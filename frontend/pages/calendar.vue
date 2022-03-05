<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar text>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            오늘
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>하루</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>한 주</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>한 달</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4일 간격</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="80%">
        <v-calendar
          v-if="type != 'day'"
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        ></v-calendar>
        <v-calendar
          v-if="type == 'day'"
          ref="calendar"
          v-model="focus"
          color="primary"
          type="category"
          category-show-all
          :categories="categories"
          :events="events"
          :event-color="getEventColor"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        ></v-calendar>
      </v-sheet>
      <calender-dialog :data="dialog" :me="me" />
      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
      >
        <v-card color="grey lighten-4" min-width="350px" text>
          <v-toolbar :color="selectedEvent.color" dark>
            <v-btn icon @click="dialog = !dialog">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="
                {
                  deleteSchedule(selectedEvent), (selectedOpen = false);
                }
              "
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn icon @click="selectedOpen = false">
              <v-icon color="white">mdi-arrow-collapse-right</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
import CalenderDialog from "~/components/CalenderDialog.vue";
export default {
  components: { CalenderDialog },
  data: () => ({
    date: "",
    dialog: false,
    focus: "",
    type: "month",
    typeToLabel: {
      month: "한 달",
      week: "한 주",
      day: "하루",
      "4day": "4일 간격",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
  }),
  fetch({ store }) {
    return store.dispatch("schedules/loadSchedules");
  },
  mounted() {
    this.$refs.calendar.checkChange();
    this.date = new Date();
  },
  methods: {
    regist(e) {
      this.events.push(e);
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    async deleteSchedule(e) {
      if (e.userId == this.me.id)
        await this.$store.dispatch("schedules/remove", { id: e.scheduleId });
      else alert("권한이 없습니다.");
    },
    updateSchedule(id) {
      this.deleteSchedule(id);
    },
  },
  computed: {
    categories() {
      const temp = this.$store.state.users.families;
      return temp.map((x) => {
        if (x.category == "아들" || x.category == "딸")
          return `${x.category}(${x.nickname})`;
        return x.category;
      });
    },
    me() {
      return this.$store.state.users.me;
    },
    events() {
      let temp = this.$store.state.schedules.mainSchedules;
      return temp;
    },
  },
};
</script>
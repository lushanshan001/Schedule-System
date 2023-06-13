<template>
  <div class="schedule">
    <!-- 规则 -->
    <div class="form-group">
      <div class="form">
        <el-dialog
          title="规则"
          v-model="dialogVisible"
          :before-close="handleClose"
          width="50%"
        >
          <!-- 表单消息 -->
          <el-form
            class="show"
            ref="taskForm"
            :rules="taskRule"
            :inline="true"
            :model="form"
            label-width="auto"
          >
            <el-form-item label="规则名称：" prop="taskName">
              <el-input v-model="form.taskName"></el-input>
            </el-form-item>

            <el-row>
              <el-form-item label="计算公式：" prop="formula">
                <label>预测客流/&ensp;</label>
                <el-input
                  class="ruleItem"
                  v-model="form.formula"
                  oninput="if(value.length>6)value=value.slice(0,5)"
                ></el-input>
                <label>= 店员需求数。</label>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="可选职位：" prop="position">
                <el-checkbox-group v-model="form.positionNames">
                  <el-checkbox
                    v-for="item in positions"
                    :label="item"
                    :key="item"
                    border
                    >{{ item }}</el-checkbox
                  >
                </el-checkbox-group>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="最少人数：">
                <el-input
                  class="ruleItem"
                  v-model="form.min"
                  type="number"
                  oninput="if(value<0)value=0"
                ></el-input>
              </el-form-item>
              <el-form-item label="最多人数：">
                <el-input
                  class="ruleItem"
                  v-model="form.max"
                  type="number"
                  oninput="if(value<0)value=0"
                ></el-input>
              </el-form-item>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="开始时间：" prop="startTime">
                  <el-time-select
                    v-model="form.startTime"
                    start="09:00"
                    step="01:00"
                    end="22:00"
                    placeholder="开始时间"
                    :picker-options="pickerOptionsStart"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="结束时间：" prop="endTime">
                  <el-time-select
                    v-model="form.endTime"
                    start="09:00"
                    step="01:00"
                    end="22:00"
                    placeholder="结束时间"
                    :picker-options="pickerOptionsEnd"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="addRule">确 定</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
      <div class="form">
        <el-dialog
          title="规则"
          v-model="dialogVisibleTwo"
          :before-close="handleClose"
          width="50%"
        >
          <!-- 表单消息 -->
          <el-form
            class="show"
            ref="taskForm"
            :inline="true"
            :model="form"
            label-width="auto"
          >
            <el-form-item label="规则名称：" prop="taskName">
              <el-input v-model="form.taskName"></el-input>
            </el-form-item>

            <el-row>
              <el-form-item label="计算公式：" prop="formula">
                <label>预测客流/&ensp;</label>
                <el-input
                  class="ruleItem"
                  v-model="form.formula"
                  oninput="if(value.length>6)value=value.slice(0,5)"
                ></el-input>
                <label>= 店员需求数。</label>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="可选职位：" prop="position">
                <el-checkbox-group v-model="form.positionNames">
                  <el-checkbox
                    v-for="item in positions"
                    :label="item"
                    :key="item"
                    border
                    >{{ item }}</el-checkbox
                  >
                </el-checkbox-group>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="最少人数：">
                <el-input
                  class="ruleItem"
                  v-model="form.min"
                  type="number"
                  oninput="if(value<0)value=0"
                ></el-input>
              </el-form-item>
              <el-form-item label="最多人数：">
                <el-input
                  class="ruleItem"
                  v-model="form.max"
                  type="number"
                  oninput="if(value<0)value=0"
                ></el-input>
              </el-form-item>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="开始时间：" prop="startTime">
                  <el-time-select
                    v-model="form.startTime"
                    start="09:00"
                    step="01:00"
                    end="22:00"
                    placeholder="开始时间"
                    :picker-options="pickerOptionsStart"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="结束时间：" prop="endTime">
                  <el-time-select
                    v-model="form.endTime"
                    start="09:00"
                    step="01:00"
                    end="22:00"
                    placeholder="结束时间"
                    :picker-options="pickerOptionsEnd"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="addRule">确 定</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
      <div class="form">
        <el-dialog
          title="指定规则"
          v-model="dialogVisibleOne"
          :before-close="handleClose"
          :ref="form"
          width="50%"
        >
          <!-- 表单消息 -->
          <el-form
            class="show"
            ref="form"
            :rules="rule"
            :inline="true"
            :model="form"
            label-width="auto"
          >
            <el-form-item label="规则名称：" prop="taskName">
              <el-input v-model="form.taskName" disabled="true"></el-input>
            </el-form-item>

            <el-form-item
              v-if="this.form.taskName === '开店规则'"
              label="开店规则："
              prop="setUpRule"
            >
              <div class="ruleDetail">
                <el-form-item label="每天开店之前需要">
                  <el-input
                    class="ruleItem"
                    v-model="form.setUpRule.hours"
                    oninput="if(value.length>6)value=value.slice(0,5)"
                  ></el-input>
                  <label>小时做准备工作</label>
                </el-form-item>
              </div>

              <div class="ruleDetail">
                <el-form-item label="公式：门店面积/">
                  <el-input
                    class="ruleItem"
                    v-model="form.setUpRule.formula"
                    oninput="if(value.length>6)value=value.slice(0,5)"
                  ></el-input>
                  <label>= 人数。</label>
                </el-form-item>
              </div>

              <div class="ruleDetail">
                <el-form-item label="请设置最少人数">
                  <el-input
                    class="ruleItem"
                    v-model="form.setUpRule.min"
                    type="number"
                    oninput="if(value<0)value=0"
                  ></el-input>
                  <label>（人数不能小于1）</label>
                </el-form-item>
              </div>

              <div class="ruleDetail">
                <label>选择执行的职位:</label>
                <el-checkbox-group v-model="form.setUpRule.positionNames">
                  <el-checkbox
                    v-for="item in positions"
                    :label="item"
                    :key="item"
                    border
                    >{{ item }}</el-checkbox
                  >
                </el-checkbox-group>
              </div>
            </el-form-item>

            <el-form-item
              v-if="this.form.taskName === '关店规则'"
              label="关店规则："
              prop="endRule"
            >
              <div class="ruleDetail">
                <el-form-item label="每天关店之后需要">
                  <el-input
                    class="ruleItem"
                    v-model="form.endRule.hours"
                    oninput="if(value.length>6)value=value.slice(0,5)"
                  ></el-input>
                  <label>小时做收尾工作（如盘点，清洁）。</label>
                </el-form-item>
              </div>

              <div class="ruleDetail">
                <el-form-item label="公式：门店面积/">
                  <el-input
                    class="ruleItem"
                    v-model="form.endRule.formula"
                    oninput="if(value.length>6)value=value.slice(0,5)"
                  ></el-input>
                  <label>= 人数。</label>
                </el-form-item>
              </div>
              <div class="ruleDetail">
                <el-form-item label="请设置最少人数">
                  <el-input
                    class="ruleItem"
                    v-model="form.endRule.min"
                    type="number"
                    oninput="if(value<0)value=0"
                  ></el-input>
                  <label>（人数不能小于1）</label>
                </el-form-item>
              </div>

              <div class="ruleDetail">
                <label>选择执行的职位:</label>
                <el-checkbox-group v-model="form.endRule.positionNames">
                  <el-checkbox
                    v-for="item in positions"
                    :label="item"
                    :key="item"
                    border
                    >{{ item }}</el-checkbox
                  >
                </el-checkbox-group>
              </div>
            </el-form-item>

            <el-form-item
              v-if="this.form.taskName === '最少人员配备规则'"
              label="人员配备规则："
              prop="endRule"
            >
              <div class="ruleDetail">
                <label
                  >这个规则的范围是一整个上班时间。如果没有客流量的时候，</label
                >
              </div>
              <div class="ruleDetail">
                <el-form-item label="至少需要">
                  <el-input
                    class="ruleItem"
                    v-model="form.minRule.min"
                    oninput="if(value.length>6)value=value.slice(0,5)"
                  ></el-input>
                  <label>个店员值班。</label>
                </el-form-item>
              </div>
            </el-form-item>

            <el-form-item
              v-if="this.form.taskName === '客流规则'"
              label="客流规则："
              prop="eaduitRule"
            >
              <div class="ruleDetail">
                <el-form-item label="公式：预测客流/">
                  <el-input
                    class="ruleItem"
                    v-model="form.aduitRule.formula"
                    oninput="if(value.length>6)value=value.slice(0,5)"
                  ></el-input>
                  <label>= 店员需求数。</label>
                </el-form-item>
              </div>

              <div class="ruleDetail">
                <label>选择执行的职位:</label>
                <el-checkbox-group v-model="form.aduitRule.positionNames">
                  <el-checkbox
                    v-for="item in positions"
                    :label="item"
                    :key="item"
                    border
                    >{{ item }}</el-checkbox
                  >
                </el-checkbox-group>
              </div>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="submitRule">确 定</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
    <!-- 选择规则 -->
    <div class="choose">
      <div class="title">
        <div>规则列表</div>
      </div>
      <div class="rule">
        <div class="shift">
          <div>
            <el-checkbox-group>
              <el-button
                style="background-color: rgba(103, 114, 229, 0.6);"
                @click="checkRule('开店')"
                >开店规则</el-button
              >
              <el-button
                style="background-color: rgba(67, 211, 148, 0.6);"
                @click="checkRule('关店')"
                >关店规则</el-button
              >
              <el-button
                style="background-color: rgba(255, 118, 0, 0.6);"
                @click="checkRule('最少人员配备')"
                >最少人员配备规则</el-button
              >
              <el-button
                style="background-color: rgba(215, 130, 217, 0.6);"
                @click="checkRule('客流')"
                >客流规则</el-button
              >

              <el-checkbox-group v-model="taskRuleLists">
                <el-checkbox
                  v-for="item in taskRuleList"
                  :key="item.ruleId"
                  :label="item.ruleId"
                  border
                  class="set-rule"
                >
                  <label @click="checkChangeRule(item)">{{
                    item.ruleName
                  }}</label>
                </el-checkbox>
                <el-button round @click="addTask"
                  ><el-icon><CirclePlus /></el-icon> 添加</el-button
                >
              </el-checkbox-group>
            </el-checkbox-group>
          </div>
        </div>
        <div class="right">
          <el-button type="primary" @click="scheduling">智能排班</el-button>
        </div>
      </div>
    </div>
    <!-- 展示排班表消息 -->
    <div class="show-schedule">
      <Week
        ref="week"
        @getValue="getValue"
        :taskRuleLists="taskRuleLists"
      ></Week>
    </div>
  </div>
</template>
<style scoped src="@/assets/css/schedule/schedule.css">
</style>
<script src="@/assets/js/schedule/schedule"></script>
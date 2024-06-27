<template>
    <div class="condition">
        <div class="condition__conteiner">
            <h3>Нетерпится приступить к изуениею книг?</h3>
            <button>
                <p>зарегистрируйтесь</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
$btn-color: rgb(199, 199, 199);

.condition {
    margin-top: 200px;

    .condition__conteiner {

        button {
            margin-top: 20px;
            cursor: pointer;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 5px 10px;
            border-radius: 8px;
            background: transparent;
            width: 208px;

            &:hover {
                color: $btn-color;

                svg {
                    margin-left: 40px;

                    path {
                        fill: $btn-color;
                    }
                }
            }

            p {
                font-size: 14px;
            }
            
            svg {
                width: 20px;
                height: auto;
                margin-left: 20px;
                transition: all 0.8s ease;
            }
        }
    }
}
</style>
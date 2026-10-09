using Rougelette.Characters;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Rougelette
{
    public partial class frmCharacterSelect : Form
    {
        //Global
        private frmRougelette roguelette;
        public frmCharacterSelect(frmRougelette rogue)
        {
            InitializeComponent();
            //Set our global 
            roguelette = rogue;
        }
        private void btnCowBoySelect_Click(object sender, EventArgs e)
        {
            //Creates a cowboy obj and sends it to the main game form
            //Copy this for any new character
            Cowboy cowboy = new Cowboy();
            roguelette.SetChar(cowboy);
            this.DialogResult = DialogResult.OK;
            //Make sure this is called last in any characters button click event otherwise the character wont be made first
            MainGameSwap();
        }
        //Method that opens the main game and hides this
        private void MainGameSwap()
        {
            roguelette.Show();
            this.Hide();
        }

        private void btnPirateSelect_Click(object sender, EventArgs e)
        {
            //Creates a pirate obj and sends it to the main game form
            Pirate pirate = new Pirate();
            roguelette.SetChar(pirate);
            this.DialogResult = DialogResult.OK;

            MainGameSwap();
        }

        private void btnMonkeySelect_Click(object sender, EventArgs e)
        {
            //Creates a monkey obj and sends it to the main game form
            Monkey monkey = new Monkey();
            roguelette.SetChar(monkey);
            this.DialogResult = DialogResult.OK;

            MainGameSwap();
        }

        private void btnTrustfuncSelect_Click(object sender, EventArgs e)
        {
            //Creates Trustfund obj and sends to main
            TrustFund trustfund = new TrustFund();
            roguelette.SetChar(trustfund);
            this.DialogResult = DialogResult.OK;

            MainGameSwap();
        }

        private void btnWretchSelect_Click(object sender, EventArgs e)
        {
            //creates Wretch obj and sends to main
            Wretch wretch = new Wretch();
            roguelette.SetChar(wretch);
            this.DialogResult = DialogResult.OK;

            MainGameSwap();
        }

        private void btnChrisSelect_Click(object sender, EventArgs e)
        {
            //creates chris obj and sends to main
            Chris chris = new Chris();
            roguelette.SetChar(chris);
            this.DialogResult = DialogResult.OK;

            MainGameSwap();
        }
    }
}
